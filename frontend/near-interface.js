/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class ProductivityApp {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse
  }

  async getTasks() {
    const tasks = await this.wallet.viewMethod({ contractId: this.contractId, method: "get_all_tasks" })
    console.log(tasks)
    return tasks
  }

  async addTask(id, task) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: "add_task", args: { id, task }});
  }

}