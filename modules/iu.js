const Blackboard = require('./blackboard');

class IU
{
    constructor(host = 'https://blackboard.hcmiu.edu.vn')
    {
        this.host = host;
    }

    handleBlackboardNotification(username, password, handle)
    {
        return new Promise(async(resolve, reject) => {
            try {
                let blackboard = new Blackboard(username, password, this.host);
                let notifcations = await blackboard.getUnseenBlackboardNotification();

                if (notifcations.success) {
                    Object.values(notifcations.data).forEach(async (value) => {
                        try {
                            let notifcation = await blackboard.filterUnseenBlackboardNotification(value);
                            handle(notifcation);
                        } catch(error) {
                            reject({ success: false, data: error + '' });
                        }
                    });
                } else {
                    reject({ success: false, data: notifcations.data });
                }
            } catch(error) {
                reject({ success: false, data: error + '' });
            }
        });
    }
}

module.exports = IU;