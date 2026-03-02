
async function fetchTaskResult(email, endpoint) {
    const params = new URLSearchParams({ url: endpoint, email });
    const apiUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?${params}`;

    const res = await fetch(apiUrl);
    if (!res.ok) {
        // make the error message a little more human
        throw new Error(`server returned ${res.status}`);
    }
    return res.json();
}

// once the DOM is ready wire up the form
document.addEventListener('DOMContentLoaded', function () {
    const form       = document.getElementById('task-form');    // form element
    const outputElem = document.getElementById('output');       // where JSON will appear

    form.addEventListener('submit', async function (evt) {
        evt.preventDefault();

        const email    = document.getElementById('email').value.trim();
        const endpoint = document.getElementById('endpoint').value.trim();

        if (!email || !endpoint) return; // should be caught by HTML, but just in case

        // UI: make it clear something is happening
        outputElem.textContent = 'Loading...';
        outputElem.classList.add('loading');
        const submitBtn = form.querySelector('button');
        submitBtn.disabled = true;

        try {
            const data = await fetchTaskResult(email, endpoint);
            // using textContent keeps us from accidentally rendering HTML
            outputElem.textContent = JSON.stringify(data, null, 2);
        } catch (err) {
            outputElem.textContent = `Error: ${err.message}`;
        } finally {
            outputElem.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});
