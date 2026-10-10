import { TransactionController } from "./controllers/transaction-controller.js";
import { TransactionModel } from "./models/transaction-model.js";
import { TransactionView } from "./views/transaction-view.js";

const view = new TransactionView();

try {
    const model = new TransactionModel();
    const controller = new TransactionController(model, view);
    controller.start();
} catch (error) {
    view.showSignIn();
    view.showSignInMessage(
        error instanceof Error
            ? `Could not open the demo: ${error.message}`
            : "Could not open the demo."
    );
}
