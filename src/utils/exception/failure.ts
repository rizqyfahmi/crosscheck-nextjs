export abstract class Failure {
    message: string
    data: any

    constructor(message: string, data: any) {
        this.message = message
        this.data = data
    }

    display(): void {
        console.log("message: ", this.message)
        console.log("data: ", this.data)
    }
    
    abstract export(): Failure

}

export class ServerFailure extends Failure {
    
    constructor(message: string, data: any) {
        super(message, data)
    }

    export(): Failure {
        return new ServerFailure(this.message, this.data)
    }
    
}

export class NullFailure extends Failure {
    
    constructor(message: string, data: any) {
        super(message, data)
    }

    export(): Failure {
        return new NullFailure(this.message, this.data)
    }

}

export class UnexpectedFailure extends Failure {

    constructor(message: string, data: any) {
        super(message, data)
    }

    export(): Failure {
        return new UnexpectedFailure(this.message, this.data)
    }

}