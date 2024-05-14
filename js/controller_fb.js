import { getDatabase, ref, set, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
//

$(function () {
    "use strict";

    window.CONTROLLER = window.CONTROLLER || {};

    (function (con) {

        //

        const db = getDatabase();

        //


        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();

            if (data.round != null) {
                if (data.round == 0) {
                    $('#q-text, #num-ans, .ans-text, .ans-score').html('')
                    $('.ans-reveal').attr('disabled', true).css('background-color', 'black')
                }
                else {
                    $('#q-text').html(eval('data.q_' + data.round + '_q'))

                    var num_ans = eval('data.q_' + data.round + '_num_a')
                    $('#num-ans').html(num_ans)

                    $('.ans-reveal').attr('disabled', true)
                    if (1 <= num_ans && num_ans <= 8) {
                        for (var i = 1; i <= 8; i++) {
                            if (i <= num_ans) {
                                $('#ans-' + i + ' .ans-reveal').removeAttr('disabled')
                            }
                            $('#ans-' + i + ' .ans-text').html(eval('data.q_' + data.round + '_a_t_' + i))
                            $('#ans-' + i + ' .ans-score').html(eval('data.q_' + data.round + '_a_s_' + i))
                        }
                    }

                }
            }

            $('.total-score').html(data.total_score)

            $('#team-info-1 .team-name').html(data.team_1_name)
            $('#team-info-1 .team-score').html(data.team_1_score)
            $('#team-info-1 #team-player-name-1').html(data.team_1_con_1_name)
            $('#team-info-1 #team-player-info-1').html(data.team_1_con_1_info)
            $('#team-info-1 #team-player-name-2').html(data.team_1_con_2_name)
            $('#team-info-1 #team-player-info-2').html(data.team_1_con_2_info)
            $('#team-info-1 #team-player-name-3').html(data.team_1_con_3_name)
            $('#team-info-1 #team-player-info-3').html(data.team_1_con_3_info)
            $('#team-info-1 #team-player-name-4').html(data.team_1_con_4_name)
            $('#team-info-1 #team-player-info-4').html(data.team_1_con_4_info)

            $('#team-info-2 .team-name').html(data.team_2_name)
            $('#team-info-2 .team-score').html(data.team_2_score)
            $('#team-info-2 #team-player-name-1').html(data.team_2_con_1_name)
            $('#team-info-2 #team-player-info-1').html(data.team_2_con_1_info)
            $('#team-info-2 #team-player-name-2').html(data.team_2_con_2_name)
            $('#team-info-2 #team-player-info-2').html(data.team_2_con_2_info)
            $('#team-info-2 #team-player-name-3').html(data.team_2_con_3_name)
            $('#team-info-2 #team-player-info-3').html(data.team_2_con_3_info)
            $('#team-info-2 #team-player-name-4').html(data.team_2_con_4_name)
            $('#team-info-2 #team-player-info-4').html(data.team_2_con_4_info)

            for (var i = 1; i <= 5; i++) {
                $('#br-question-' + i).html(eval('data.br_q_' + i + '_q'))
            }

            $('.br-q-text').html(eval('data.br_q_' + data.br_q_choosing + '_q'))
            for (var i = 1; i <= 8; i++) {
                $('#br-right-ans-' + i + ' .br-ans-text').html(eval('data.br_q_' + data.br_q_choosing + '_a_t_' + i))
                $('#br-right-ans-' + i + ' .br-ans-score').html(eval('data.br_q_' + data.br_q_choosing + '_a_s_' + i))
            }
        });

        //

        var timec = 0;
        var ticout = 0;
        var scout = 0;

        var round = 0;
        var ans_open = [0, 0, 0, 0, 0, 0, 0, 0];
        var br_ans_open = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var timer = 0;

        var timer_20_count = 0;
        var timer_25_count = 0;

        var total_score = 0;
        var team_1_score = 0;
        var team_2_score = 0;

        var is_adding_to_total = true;
        var is_doubling = true;
        var is_tripling = true;
        var is_adding_to_winning_team = true;

        var score_backdrop;

        var br_q_choosing = 0;

        //

        function upd(key, val) {
            update(ref(db), {
                [key]: val
            })
        }

        function enb(key) {
            $(key).removeAttr('disabled')
        }

        function dib(key) {
            $(key).attr('disabled', true);
        }

        function resetdatabase(removefirst) {
            if (removefirst == true) {
                remove(ref(db));
            }

            upd('var_holder', 0);

            timec = 0;
            upd('timec', timec);
            $('#h1-obj5').css('background-color', 'black')

            ticout = 0;
            upd('ticout', ticout);
            $('#h1-obj6').css('background-color', 'black')

            round = 0;
            upd('round', round);
            $('#h3-1-obj1').html('')

            $('#get-qs, #get-cs').val(null)

            for (var i = 4; i <= 52; i += 12) {
                var no = (i - 4) / 12 + 1;
                upd('q_' + no + '_q', '')
                upd('q_' + no + '_num_a', 0)
                for (var j = 1; j <= 8; j++) {
                    upd('q_' + no + '_a_t_' + j, '')
                    upd('q_' + no + '_a_s_' + j, 0)
                }
            }

            for (var i = 64; i <= 114; i += 10) {
                var no = (i - 64) / 10 + 1;
                upd('br_q_' + no + '_q', '')
                for (var j = 1; j <= 8; j++) {
                    upd('br_q_' + no + '_a_t_' + j, '')
                    upd('br_q_' + no + '_a_s_' + j, 0)
                }
            }

            upd('team_1_name', '')
            upd('team_1_num_c', 0)
            for (var i = 1; i <= 4; i++) {
                upd('team_1_con_' + i + '_name', '')
            }

            upd('team_2_name', '')
            upd('team_2_num_c', 0)
            for (var i = 1; i <= 4; i++) {
                upd('team_2_con_' + i + '_name', '')
            }

            for (var i = 1; i <= 8; i++) {
                upd('ans_' + i + '_open', 0)
                ans_open = [0, 0, 0, 0, 0, 0, 0, 0]
                $('.ans-reveal').css('background-color', 'black')
            }

            $('.ans-reveal').attr('disabled', true)

            total_score = 0;
            upd('total_score', total_score)
            team_1_score = 0;
            upd('team_1_score', team_1_score)
            team_2_score = 0;
            upd('team_2_score', team_2_score)

            is_adding_to_total = false;
            is_adding_to_winning_team = false;
            is_doubling = false;
            is_tripling = false;
            score_backdrop = false;
            upd('is_adding_to_total', is_adding_to_total)
            $('#is-adding-to-total').prop('checked', is_adding_to_total)
            upd('is_doubling', is_doubling)
            $('#is-doubling').prop('checked', is_doubling)
            upd('is_tripling', is_tripling)
            $('#is-tripling').prop('checked', is_tripling)
            upd('is_adding_to_winning_team', is_adding_to_winning_team)
            $('#is-adding-to-winning-team').prop('checked', is_adding_to_winning_team)
            upd('score_backdrop', 0)
            $('#score-backdrop').prop('checked', score_backdrop)
            dib('.reveal-ans')
            dib('.reset-ans')

            ans_open = [0, 0, 0, 0, 0, 0, 0, 0]
            $('.ans-reveal').css('background-color', 'black')
            for (var i = 1; i <= 8; i++) {
                upd('ans_' + i + '_open', 0)
            }

            br_ans_open = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            $('.br-ans-reveal').css('background-color', 'black')
            enb('.br-ans-reveal')
            dib('.br-ans-hide')

            for (var i = 1; i <= 8; i++) {
                upd('br_ans_' + i + '_open', 0)
            }

            total_score = 0;
            upd('total_score', total_score)

            upd('winning_team', -1)
            dib('#h3-1-obj2, #h3-1-obj3')

            upd('reload', 0)

            upd('timer', 0)
            upd('timer_20_count', 0)
            upd('timer_25_count', 0)
            $('.h3-hold-0 #timer-20, .h3-hold-0 #timer-25, .h3-hold-2 #timer-20, .h3-hold-2 #timer-25').css('background-color', 'black')

            enb('.timer')

            for (var i = 1; i <= 10; i++) {
                upd('br_ans_player_input_' + i, '')
                upd('br_ans_player_score_input_' + i, 0)
            }

            $('#h1-obj1').click();

            $('.br-ans-input,  .camera-url-input').val('')
            $('.br-ans-score-input').val(0)

            upd('camera_url_input', $('.camera-url-input').val())

            br_q_choosing = 0;
            upd('br_q_choosing', 0)

            $('.br-q-choose').html("");
            $('.br-q-text, .br-right-ans').val()
        }

        //resetdatabase(true);

        //

        $('#h1-obj1').click(function () {
            upd('var_holder', 0)
            enb('#h1-obj1, #h1-obj2, #h1-obj3, #h1-obj4');
            dib(this);
            $('.h3-hold').css('opacity', 0).css('top', '500%')
            $('#h3-hold-0').css('opacity', 1).css('top', '1%')
            $('.h5-hold').css('opacity', 0).css('top', '500%')
        })

        $('#h1-obj2').click(function () {
            upd('var_holder', 1)
            enb('#h1-obj1, #h1-obj2, #h1-obj3, #h1-obj4');
            dib(this);
            $('.h3-hold').css('opacity', 0).css('top', '500%')
            $('#h3-hold-1').css('opacity', 1).css('top', '1%')
            $('.h5-hold').css('opacity', 0).css('top', '500%')
        })

        $('#h1-obj3').click(function () {
            upd('var_holder', 2)
            enb('#h1-obj1, #h1-obj2, #h1-obj3, #h1-obj4');
            dib(this);
            $('.h3-hold').css('opacity', 0).css('top', '500%')
            $('#h3-hold-2').css('opacity', 1).css('top', '1%')
            $('.h5-hold').css('opacity', 1).css('top', '1%')
        })

        $('#h1-obj4').click(function () {
            upd('var_holder', 3)
            enb('#h1-obj1, #h1-obj2, #h1-obj3, #h1-obj4');
            dib(this);
            $('.h3-hold').css('opacity', 0).css('top', '500%')
            $('#h3-hold-2').css('opacity', 1).css('top', '1%')
            timec = 0;
            upd('timec', timec);
            $('#h1-obj5').css('background-color', 'black')
            $('.h5-hold').css('opacity', 1).css('top', '1%')
        })

        $('#h1-obj5').click(function () {
            timec = (timec + 1) % 2;
            upd('timec', timec);
            if (timec == 1) {
                $(this).css('background-color', 'rgb(3, 37, 3)')
            }
            else if (timec == 0) {
                $(this).css('background-color', 'black')
            }
        })

        $('#h1-obj10').click(function () {
            scout = (scout + 1) % 2;
            upd('scout', scout);
            if (scout == 1) {
                $(this).css('background-color', 'rgb(3, 37, 3)')
            }
            else if (scout == 0) {
                $(this).css('background-color', 'black')
            }
        })

        $('#h1-obj6').click(function () {
            ticout = (ticout + 1) % 2;
            upd('ticout', ticout);
            if (ticout == 1) {
                $(this).css('background-color', 'rgb(3, 37, 3)')
            }
            else if (ticout == 0) {
                $(this).css('background-color', 'black')
            }
        })

        $('#h1-obj8').click(function () {
            upd('reload', 1)
        })

        $('#h1-obj9').click(function () {
            resetdatabase(true);
        })

        //

        $('#get-qs').on("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(e.target.result, { sheetStubs: true });
                var sheet = workbook.Sheets[workbook.SheetNames[0]];

                for (var i = 4; i <= 52; i += 12) {
                    var no = (i - 4) / 12 + 1;
                    upd('q_' + no + '_q', sheet['B' + i].v)
                    var num_ans = sheet['B' + (i + 1)].v
                    upd('q_' + no + '_num_a', num_ans)
                    for (var j = 1; j <= num_ans; j++) {
                        upd('q_' + no + '_a_t_' + j, sheet['B' + (i + 1 + j)].v)
                        upd('q_' + no + '_a_s_' + j, sheet['C' + (i + 1 + j)].v)
                    }
                    for (var j = num_ans + 1; j <= 8; j++) {
                        upd('q_' + no + '_a_t_' + j, '')
                        upd('q_' + no + '_a_s_' + j, '')
                    }
                }

                for (var i = 64; i <= 114; i += 10) {
                    var no = (i - 64) / 10 + 1;
                    upd('br_q_' + no + '_q', sheet['B' + i].v)
                    upd('br_q_' + no + '_num_a', num_ans)
                    for (var j = 1; j <= 8; j++) {
                        upd('br_q_' + no + '_a_t_' + j, sheet['B' + (i + j)].v)
                        upd('br_q_' + no + '_a_s_' + j, sheet['C' + (i + j)].v)
                    }
                }
            };
            reader.readAsArrayBuffer(file);
        })

        $('#get-cs').on("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(e.target.result, { sheetStubs: true });
                var sheet = workbook.Sheets[workbook.SheetNames[0]];

                upd('team_1_name', sheet['B4'].v)
                var num_cont = sheet['B5'].v
                upd('team_1_num_c', num_cont)
                for (var i = 1; i <= num_cont; i++) {
                    upd('team_1_con_' + i + '_name', sheet['B' + (i + 5)].v)
                    upd('team_1_con_' + i + '_info', sheet['C' + (i + 5)].v)
                }
                upd('team_2_name', sheet['B11'].v)
                var num_cont = sheet['B12'].v
                upd('team_2_num_c', num_cont)
                for (var i = 1; i <= num_cont; i++) {
                    upd('team_2_con_' + i + '_name', sheet['B' + (i + 12)].v)
                    upd('team_2_con_' + i + '_info', sheet['C' + (i + 12)].v)
                }
            }
            reader.readAsArrayBuffer(file);
        })

        $('#tsfs1').click(function () {
            team_1_score = parseInt($('#team-info-1 .team-score-fix').val())
            upd('team_1_score', team_1_score);
        })

        $('#tsfs2').click(function () {
            team_2_score = parseInt($('#team-info-2 .team-score-fix').val())
            upd('team_2_score', team_2_score);
        })

        //

        $('#h3-1-obj1').click(function () {

            $('.reset-ans').click()

            round = (round + 1) % 5;
            if (round == 0) round = 5;
            upd('round', round)

            if (round == 1) {
                $('#h3-1-obj1').html('ROUND 1 - QUES 1')
                is_doubling = false;
                is_tripling = false;
            }
            else if (round == 2) {
                $('#h3-1-obj1').html('ROUND 1 - QUES 2')
                is_doubling = false;
                is_tripling = false;
            }
            else if (round == 3) {
                $('#h3-1-obj1').html('ROUND 2')
                is_doubling = false;
                is_tripling = false;
            }
            else if (round == 4) {
                $('#h3-1-obj1').html('ROUND 3')
                is_doubling = true;
                is_tripling = false;
            }
            else if (round == 5) {
                $('#h3-1-obj1').html('ROUND 4')
                is_doubling = false;
                is_tripling = true;
            }
            else {
                $('#h3-1-obj1').html('')
            }

            upd('is_doubling', is_doubling)
            $('#is-doubling').prop('checked', is_doubling)
            upd('is_tripling', is_tripling)
            $('#is-tripling').prop('checked', is_tripling)
        })

        $('.ans-reveal').click(function () {
            var id = $(this).parent().attr('id');
            id = id.substr(id.length - 1)
            ans_open[id - 1]++;
            ans_open[id - 1] %= 2;
            upd('ans_' + id + '_open', 10 + ans_open[id - 1])
            setTimeout(function () {
                upd('ans_' + id + '_open', ans_open[id - 1])
            }, 1000);
            var score = parseInt($('#ans-' + id + ' .ans-score').html());
            if (ans_open[id - 1] == 1) {
                $(this).css('background-color', 'rgb(3, 37, 3)')
                if (is_adding_to_total == true) {
                    total_score += score;
                    upd('total_score', total_score)
                }
            }
            else if (ans_open[id - 1] == 0) {
                $(this).css('background-color', 'black')
                if (is_adding_to_total == true) {
                    total_score -= score;
                    upd('total_score', total_score)
                }
            }
        })

        $('#is-adding-to-total').change(function () {
            is_adding_to_total = this.checked;
            upd('is_adding_to_total', this.checked)
        })

        $('#is-doubling').change(function () {
            is_doubling = this.checked;
            upd('is_doubling', this.checked)
            if (is_tripling == true) {
                is_tripling = false;
                upd('is_tripling', false)
                $('#is-tripling').prop('checked', false);
            }
        })

        $('#is-tripling').change(function () {
            is_tripling = this.checked;
            upd('is_tripling', this.checked)
            if (is_doubling == true) {
                is_doubling = false;
                upd('is_doubling', false)
                $('#is-doubling').prop('checked', false);
            }
        })

        $('#is-adding-to-winning-team').change(function () {
            is_adding_to_winning_team = this.checked;
            upd('is_adding_to_winning_team', this.checked)
        })

        $('#score-backdrop').change(function () {
            var bool;
            if (this.checked) {
                bool = 1;
            }
            else {
                bool = 0;
            }
            score_backdrop = bool;
            upd('score_backdrop', bool)
        })

        //

        $('#h3-1-obj2').click(function () {
            var sc = total_score;
            if (is_doubling == true) {
                sc *= 2;
            }
            else if (is_tripling == true) {
                sc *= 3;
            }
            if (is_adding_to_winning_team == true) {
                team_1_score += sc;
                upd('team_1_score', team_1_score);
                is_adding_to_winning_team = false;
                upd('is_adding_to_winning_team', is_adding_to_winning_team)
                $('#is-adding-to-winning-team').prop('checked', false)
            }
            is_adding_to_total = false;
            upd('is_adding_to_total', is_adding_to_total)
            $('#is-adding-to-total').prop('checked', false)
            upd('winning_team', 1)
            dib('#h3-1-obj2, #h3-1-obj3')
            score_backdrop = true;
            upd('score_backdrop', 1)
            $('#score-backdrop').prop('checked', true)
        })

        $('#h3-1-obj3').click(function () {
            var sc = total_score;
            if (is_doubling == true) {
                sc *= 2;
            }
            else if (is_tripling == true) {
                sc *= 3;
            }
            if (is_adding_to_winning_team == true) {
                team_2_score += sc;
                upd('team_2_score', team_2_score);
                is_adding_to_winning_team = false;
                upd('is_adding_to_winning_team', is_adding_to_winning_team)
                $('#is-adding-to-winning-team').prop('checked', false)
            }
            is_adding_to_total = false;
            upd('is_adding_to_total', is_adding_to_total)
            $('#is-adding-to-total').prop('checked', false)
            upd('winning_team', 2)
            dib('#h3-1-obj2, #h3-1-obj3')
            score_backdrop = true;
            upd('score_backdrop', 1)
            $('#score-backdrop').prop('checked', true)
        })

        $('.reveal-ans').click(function () {
            upd('reveal_ans', 11)
            setTimeout(function () {
                upd('reveal_ans', 1)
            }, 1000)
            dib('.reveal-ans')
        })

        $('.reset-ans').click(function () {
            upd('reveal_ans', 0)
            enb('.reveal-ans')

            is_adding_to_total = true;
            is_adding_to_winning_team = true;
            score_backdrop = false;
            upd('is_adding_to_total', is_adding_to_total)
            $('#is-adding-to-total').prop('checked', is_adding_to_total)
            upd('is_doubling', is_doubling)
            $('#is-doubling').prop('checked', is_doubling)
            upd('is_tripling', is_tripling)
            $('#is-tripling').prop('checked', is_tripling)
            upd('is_adding_to_winning_team', is_adding_to_winning_team)
            $('#is-adding-to-winning-team').prop('checked', is_adding_to_winning_team)
            upd('score_backdrop', 0)
            $('#score-backdrop').prop('checked', score_backdrop)

            ans_open = [0, 0, 0, 0, 0, 0, 0, 0]
            $('.ans-reveal').css('background-color', 'black')
            for (var i = 1; i <= 8; i++) {
                upd('ans_' + i + '_open', 0)
            }
            total_score = 0;
            upd('total_score', total_score)

            upd('winning_team', 0)
            enb('#h3-1-obj2, #h3-1-obj3, .reveal-ans, .reset-ans')
        })

        $('#cross-1').click(function () {
            upd('cross_1', 1);
        })

        $('#cross-2').click(function () {
            upd('cross_2', 1);
        })

        $('#cross-3').click(function () {
            upd('cross_3', 1);
        })

        //

        $('.br-ans-reveal').click(function () {
            var id = $(this).attr('id');
            id = id.substr(id.length - 1)
            if (id == 0) id = 10;
            br_ans_open[id - 1]++;
            br_ans_open[id - 1] %= 3;

            var rev = '#br-ans-reveal-' + id;
            var hid = '#br-ans-hide-' + id;

            var ans_inp = ($("#br-ans-input-" + id).val() == null) ? '' : $("#br-ans-input-" + id).val();
            var sco_inp = ($("#br-ans-score-input-" + id).val() == null) ? 0 : parseInt($("#br-ans-score-input-" + id).val())

            if (br_ans_open[id - 1] == 1) {
                upd('br_ans_player_input_' + id, ans_inp)
                upd('br_ans_player_score_input_' + id, sco_inp)
                $(rev).css('background-color', 'rgb(3, 37, 3)')
                enb(rev)
                enb(hid)
            }
            else if (br_ans_open[id - 1] == 2) {
                upd('br_ans_player_input_' + id, ans_inp)
                upd('br_ans_player_score_input_' + id, sco_inp)
                $(rev).css('background-color', 'black')
                dib(rev)
                enb(hid)
                total_score += sco_inp;
                upd('total_score', total_score)
            }

            if (br_ans_open[id - 1] != 1) {
                upd('br_ans_' + id + '_open', br_ans_open[id - 1])
            }
            else {
                upd('br_ans_' + id + '_open', 11)
                setTimeout(function () {
                    upd('br_ans_' + id + '_open', 1)
                }, 350)
            }
        })

        $('.br-ans-hide').click(function () {
            var id = $(this).attr('id');
            id = id.substr(id.length - 1)
            if (id == 0) id = 10;

            get(ref(db)).then((snapshot) => {
                const data = snapshot.val();

                if (eval('data.br_ans_' + id + '_open') == 2) {
                    total_score -= parseInt(eval('data.br_ans_player_score_input_' + id));
                    upd('total_score', total_score)
                }
            })

            br_ans_open[id - 1] = 0;
            upd('br_ans_' + id + '_open', 0)

            var rev = '#br-ans-reveal-' + id;
            var hid = '#br-ans-hide-' + id;

            $(rev).css('background-color', 'black')
            enb(rev)
            dib(hid)

            //upd('br_ans_player_input_' + id, '')
            //upd('br_ans_player_score_input_' + id, 0)
        })

        $('#h3-hold-0 #timer-20, #h3-hold-2 #timer-20').click(function () {
            timer_20_count = (timer_20_count + 1) % 3;
            upd('timer_20_count', timer_20_count);
            if (timer_20_count == 1) {
                timec = 1;
                upd('timec', timec);
                $('#h1-obj5').css('background-color', 'rgb(3, 37, 3)')

                con.playtimer(20);
                $('#h3-hold-0 #timer-20, #h3-hold-2 #timer-20').css('background-color', 'rgb(3, 37, 3)')
            }
            else if (timer_20_count == 2) {
                con.playtimer(20, 1);
                $('#h3-hold-0 #timer-20, #h3-hold-2 #timer-20').css('background-color', 'black')
                dib('.timer')
                setTimeout(function () {
                    enb('.timer')
                    timer_20_count = 0;
                    upd('timer_20_count', timer_20_count);
                }, 20000)
            }
            else {
                $('#h3-hold-0 #timer-20, #h3-hold-2 #timer-20').css('background-color', 'black')
                enb('.timer')
            }
        })

        $('#h3-hold-0 #timer-25, #h3-hold-2 #timer-25').click(function () {
            timer_25_count = (timer_25_count + 1) % 3;
            upd('timer_25_count', timer_25_count);
            if (timer_25_count == 1) {
                $('#h1-obj4').click();
                con.playtimer(25);
                $('#h3-hold-0 #timer-25, #h3-hold-2 #timer-25').css('background-color', 'rgb(3, 37, 3)')
            }
            else if (timer_25_count == 2) {
                con.playtimer(25, 1);
                $('#h3-hold-0 #timer-25, #h3-hold-2 #timer-25').css('background-color', 'black')
                dib('.timer')
                setTimeout(function () {
                    enb('.timer')
                    timer_25_count = 0;
                    upd('timer_25_count', timer_25_count);
                }, 25000)
            }
            else {
                $('#h3-hold-0 #timer-25, #h3-hold-2 #timer-25').css('background-color', 'black')
                enb('.timer')
            }
        })

        $('.reset-br').click(function () {
            enb('.br-ans-reveal')
            dib('.br-ans-hide')

            br_ans_open = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            $('.br-ans-reveal').css('background-color', 'black')
            for (var i = 1; i <= 10; i++) {
                upd('br_ans_' + i + '_open', 0)
            }

            total_score = 0;
            upd('total_score', total_score)

            upd('winning_team', 0)
        })

        //

        $('.camera-url-input-submit').click(function () {
            upd('camera_url_input', $('.camera-url-input').val())
        })

        //

        $('.br-q-choose').click(function () {
            br_q_choosing++;
            br_q_choosing %= 5;
            if (br_q_choosing == 0) {
                br_q_choosing = 5;
            }
            upd('br_q_choosing', br_q_choosing)
            $('.br-q-choose').html('Question ' + br_q_choosing)
        })

        //

        get(ref(db)).then((snapshot) => {
            const data = snapshot.val();

            if (data.var_holder != null) {
                $('#h1-obj' + (data.var_holder + 1)).click();
            }

            if (data.timec != null) {
                timec = data.timec;
                if (timec == 1) {
                    $('#h1-obj5').css('background-color', 'rgb(3, 37, 3)')
                }
                else if (timec == 0) {
                    $('#h1-obj5').css('background-color', 'black')
                }
            }

            if (data.ticout != null) {
                ticout = data.ticout;
                if (ticout == 1) {
                    $('#h1-obj6').css('background-color', 'rgb(3, 37, 3)')
                }
                else if (ticout == 0) {
                    $('#h1-obj6').css('background-color', 'black')
                }
            }

            if (data.scout != null) {
                scout = data.scout;
                if (scout == 1) {
                    $('#h1-obj10').css('background-color', 'rgb(3, 37, 3)')
                }
                else if (scout == 0) {
                    $('#h1-obj10').css('background-color', 'black')
                }
            }

            if (data.round != null) {
                round = data.round;
                if (round == 1) {
                    $('#h3-1-obj1').html('ROUND 1 - QUES 1')
                }
                else if (round == 2) {
                    $('#h3-1-obj1').html('ROUND 1 - QUES 2')
                }
                else if (round == 3) {
                    $('#h3-1-obj1').html('ROUND 2')
                }
                else if (round == 4) {
                    $('#h3-1-obj1').html('ROUND 3')
                }
                else if (round == 5) {
                    $('#h3-1-obj1').html('ROUND 4')
                }
                else {
                    $('#h3-1-obj1').html('')
                    dib('.reveal-ans, .reset-ans')
                }

                for (var i = 1; i <= 8; i++) {
                    var ten = eval('data.ans_' + i + '_open')
                    if (ten != null) {
                        ans_open[i - 1] = ten;
                        if (ten == 1) {
                            $('#ans-' + i + ' .ans-reveal').css('background-color', 'rgb(3, 37, 3)')
                        }
                        else if (ten == 0) {
                            $('#ans-' + i + ' .ans-reveal').css('background-color', 'black')
                        }
                    }
                }

                for (var i = 1; i <= 10; i++) {
                    var ten = eval('data.br_ans_' + i + '_open');
                    var rev = '#br-ans-reveal-' + i;
                    var hid = '#br-ans-hide-' + i;
                    if (ten != null) {
                        br_ans_open[i - 1] = ten;
                        if (ten == 1) {
                            $(rev).css('background-color', 'rgb(3, 37, 3)')
                            enb(rev)
                            enb(hid)
                        }
                        else if (ten == 2) {
                            $(rev).css('background-color', 'black')
                            dib(rev)
                            enb(hid)
                        }
                        else if (ten == 0) {
                            $(rev).css('background-color', 'black')
                            enb(rev)
                            dib(hid)
                        }
                    }
                    $('#br-ans-input-' + i).html(eval('data.br_ans_player_input_' + i));
                    $('#br-ans-score-input-' + i).html(eval('data.br_ans_player_score_input_' + i));
                }

                if (data.is_adding_to_total != null) {
                    is_adding_to_total = data.is_adding_to_total;
                    $('#is-adding-to-total').prop('checked', is_adding_to_total);
                }

                if (data.is_doubling != null) {
                    is_doubling = data.is_doubling;
                    $('#is-doubling').prop('checked', is_doubling);
                }

                if (data.is_tripling != null) {
                    is_tripling = data.is_tripling;
                    $('#is-tripling').prop('checked', is_tripling);
                }

                if (data.is_adding_to_winning_team != null) {
                    is_adding_to_winning_team = data.is_adding_to_winning_team;
                    $('#is-adding-to-winning-team').prop('checked', is_adding_to_winning_team);
                }

                if (data.total_score != null) {
                    total_score = data.total_score;
                }

                if (data.team_1_score != null) {
                    team_1_score = data.team_1_score;
                }

                if (data.team_2_score != null) {
                    team_2_score = data.team_2_score;
                }

                if (data.winning_team != null) {
                    if (data.winning_team != 0) {
                        dib('#h3-1-obj2, #h3-1-obj3');
                    }
                    else {
                        enb('#h3-1-obj2, #h3-1-obj3');
                    }
                }

                if (data.score_backdrop != null) {
                    score_backdrop = data.score_backdrop;
                    $('#score-backdrop').prop('checked', score_backdrop);
                }

                if (data.timer_20_count != null) {
                    timer_20_count = data.timer_20_count;
                    if (timer_20_count == 1) {
                        $('#timer-20').css('background-color', 'rgb(3, 37, 3)')
                    }
                    else if (timer_20_count == 2) {
                        $('#timer-20').css('background-color', 'black')
                        dib('.timer')
                        setTimeout(function () {
                            enb('.timer')
                            timer_20_count = 0;
                            upd('timer_20_count', timer_20_count);
                        }, timer * 1000)
                    }
                    else {
                        $('#timer-20').css('background-color', 'black')
                        enb('.timer')
                    }
                }

                if (data.timer_25_count != null) {
                    timer_25_count = data.timer_25_count;
                    if (timer_25_count == 1) {
                        $('#timer-25').css('background-color', 'rgb(3, 37, 3)')
                    }
                    else if (timer_25_count == 2) {
                        $('#timer-25').css('background-color', 'black')
                        dib('.timer')
                        setTimeout(function () {
                            enb('.timer')
                            timer_25_count = 0;
                            upd('timer_25_count', timer_25_count);
                        }, timer * 1000)
                    }
                    else {
                        $('#timer-25').css('background-color', 'black')
                        enb('.timer')
                    }
                }

                if (data.camera_url_input != null) {
                    $('#camera-url-input').val(data.camera_url_input)
                }

                if (data.br_q_choosing != null) {
                    br_q_choosing = data.br_q_choosing;

                    if(br_q_choosing == 0){
                        $('.br-q-choose').html("");
                        $('.br-q-text, .br-right-ans').val("")
                    }
                    else{
                        $('.br-q-choose').html('Question ' + br_q_choosing)
                    }
                }
            }
        })


    }(window.CONTROLLER = window.CONTROLLER || {}));

});