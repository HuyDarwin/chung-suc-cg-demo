import { getDatabase, ref, set, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

$(function () {
    "use strict";

    window.CONTROLLER = window.CONTROLLER || {};

    (function (con) {
        // Init

        const db = getDatabase();

        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();

            if (data.timec != null) {
                $('#timer-holder').css('opacity', data.timec);
            }

            if (data.reload == 1) {
                location.reload(true)
                update(ref(db), { reload: 0 })
            }

            if (data.timer != null) {
                $('.timer svg text').html(data.timer)
            }
        });

    }(window.CONTROLLER = window.CONTROLLER || {}));
});