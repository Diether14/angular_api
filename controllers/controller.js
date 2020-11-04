export default class Controller {
    constructor(repository) {
        this.repository = new repository();
    }
}