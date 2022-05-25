odoo.define("pos_customer_wallet.models", function (require) {
    "use strict";

    var models = require("point_of_sale.models");

    models.load_fields("res.partner", [
        "customer_wallet_balance",
        "is_customer_wallet_user",
    ]);
    models.load_fields("account.journal", ["is_customer_wallet_journal"]);

    var order_prototype = models.Order.prototype;
    models.Order = models.Order.extend({
        export_for_printing: function () {
            var receipt = order_prototype.export_for_printing.apply(this);
            var client = this.get("client");
            receipt.is_customer_wallet_user = client
                ? client.is_customer_wallet_user
                : null;
            receipt.customer_wallet_balance = client
                ? client.customer_wallet_balance
                : null;
            return receipt;
        },
    });
});
