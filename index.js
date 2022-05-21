const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
});

/**
 * Check if the Amplify URL has already been set in this PR.
 * 
 * @param {Number} mergeRequestNumber 
 * @returns {bool}
 */
const checkForAmplifyUrl = async (mergeRequestNumber) => {
    const notes = await api.MergeRequestNotes.all(process.env.GITLAB_PROJECT_ID, mergeRequestNumber);
    for (let i=0; i<notes.length; i++) {
        if (notes[i]?.body.includes('[Amplify Preview URL]')) {
            return true;
        }
    }
    return false;
};

exports.handler = async (event, context) => {
    const openMergeRequests = await api.MergeRequests.all({
        projectId: process.env.GITLAB_PROJECT_ID
    })
    .then((requests) => {
        let open = [];
        for (let i=0; i<requests.length; i++) {
            let mid = requests[i]?.reference.replace('!', '');
            open.push(parseInt(mid));
        }
        return open || [];
    });

    for (var i=0; i<openMergeRequests.length; i++) {
        let number = openMergeRequests[i];
        let exists = await checkForAmplifyUrl(number);
        if (!exists) {
            await api.MergeRequestNotes.create(
                process.env.GITLAB_PROJECT_ID, 
                number, 
                `[Amplify Preview URL] https://pr-${number}.${process.env.AMPLIFY_PROJECT_ID}.amplifyapp.com`
            );  
        }
    }
}