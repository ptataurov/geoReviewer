import render from './../templates/form.hbs';

export default {
    renderForm(data) {
        const form = typeof data === 'string' ? { address: data } : data;

        return render(form);
    }
}