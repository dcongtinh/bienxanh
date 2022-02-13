import { observable, action } from 'mobx'

class AlertStore {
    @observable message = ''
    @observable open = false
    @observable variant = 'success'

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @action
    show = ({ message, variant }) => {
        this.message = message
        this.open = true
        this.variant = variant
    }

    @action
    hide = (variant) => {
        this.message = ''
        this.open = false
        this.variant = variant
    }
}

export default AlertStore
