
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');

const kubefy        = require('./kubefy');


module.exports = {
    createUser: async() => {
        console.log(
            chalk.yellow(
                figlet.textSync('Kubefy', { horizontalLayout: 'full' })
            )
        );
        
        return kubefy.createUser()
    },

    createFunction: async() => {
        console.log(
            chalk.yellow(
                figlet.textSync('Kubefy', { horizontalLayout: 'full' })
            )
        );
        
        return kubefy.createFunction()
    },
    
    getFunction: async() => {
        console.log(
            chalk.yellow(
                figlet.textSync('Kubefy', { horizontalLayout: 'full' })
            )
        );
        
        return kubefy.getFunction()
    }
    
    
}

