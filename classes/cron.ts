import cron from 'node-cron';

export default class Crons {
    constructor() {
        this.startCrons()
    }

    startCrons() {
        cron.schedule('0 44 12 * * *', async () => {
            console.log('CRON RUUNED');
        });
    }
}