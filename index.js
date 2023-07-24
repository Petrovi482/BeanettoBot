const API_TOKEN = '6162695444:AAGLwjPR4WIoSZIS29l6xWDjhImlna-ntMQ';
const BX_URL = 'https://gkv24.ru/rest/283/xnrdr9b32j5yotb9/bizproc.workflow.start.json?TEMPLATE_ID=212&DOCUMENT_ID[]=crm&DOCUMENT_ID[]=CCrmDocumentContact&DOCUMENT_ID[]=CONTACT_4191';
const BX_STAT_URL = 'https://gkv24.ru/rest/283/xnrdr9b32j5yotb9/bizproc.workflow.start.json?TEMPLATE_ID=213&DOCUMENT_ID[]=crm&DOCUMENT_ID[]=CCrmDocumentContact&DOCUMENT_ID[]=CONTACT_4191';

const TelegramBot = require('node-telegram-bot-api');

const BOT = new TelegramBot(API_TOKEN, {
    polling : true
});

const SCHEME_TYPES = {
    st_selecter : 'Кнопочный выбор из предложенных вариантов',
    st_text : 'Текстовый ввод',
    st_coordinates : 'Отправить геолокацию',
    st_contact : 'Контактные данные',
    st_file : 'Файл',
    st_error : 'При ошибке',
    st_final : 'Завершение без отправки заявки',
    st_final_B24 : 'Все данные получены, отправка заявки в Б24',
    st_data : 'Заполнение данных и переход к следующему пункту без сообщения',
    st_msg : 'Только сообщение и переход к следующему пункту',
    st_send_contact : 'Сообщение пользователю с контактом',
}

const BOT_CONTACTS = {
    'HOT_LINE' : {
        name : 'Горячая линия',
        phone : '88007707766'
    }
}

const FINAL_TYPE = {
    0 : 'Спасибо за обращение в нашу компанию',
    1 : 'Благодарим Вас за информацию. Ваше обращение будет передано ответственному специалисту для решения ситуации. Спасибо, что являетесь нашим клиентом!',
    2 : 'Ваше обращение будет рассмотрено. При подтверждении данной ситуации, указанная сумма будет возвращена на Ваш мобильный номер телефона (или на счет указанной банковской карты) в течении 3х дней. Спасибо, что являетесь нашим клиентом!',
    3 : 'Спасибо за Ваше обращение. Мы с Вами свяжемся в течении суток. Спасибо, что являетесь нашим клиентом!',
}

const FINAL_DESCRIPTION = {
    0 : 'Завершение по времени без ответа',
    1 : 'Благодарим Вас за информацию. Ваше обращение будет передано ответственному специалисту для решения ситуации. Спасибо, что являетесь нашим клиентом!',
    2 : 'Требуется возврат средств',
    3 : 'Требуется обратная связь',
}

const STATISTIC_FINAL_TYPE = {
    0 : 'Старт',
    1 : 'По времени без ответа',
    2 : 'Запрос обратной связи',
    3 : 'Запрос номера горячей линии',
    4 : 'Обращение без необходимости обратной связи',
    5 : 'Запрос на возврат средств',
    6 : 'Завершение с ошибкой',
}

const RESULT_KEYS = {
    res_address_manual : 'ADDRESS_MANUAL',
    res_address_geolocation : 'ADDRESS_GEOLOCATION',
    res_terminal_N : 'TERMINAL_N',
    res_problem_type : 'PROBLEM_TYPE',
    res_problem_desc : 'PROBLEM_DESCRIPTION',
    res_problem : 'PROBLEM',
    res_contact : 'CONTACT',
    res_contact_phone : 'PHONE',
    res_cash : 'CASH',
    res_card : 'CARD',
    res_back_target : 'CHARGEBACK_TARGET',
    res_pay_type : 'PAY_TYPE',
    res_need_money_back : 'MONEY_BACK',
    res_buy_yes_no : 'BUY_YES_NO',
    res_buy_desc : 'BUY_DESCRIPTION',
    res_need_recall : 'NEED_RECALL',
    res_location_X : 'LOCATION_X',
    res_location_Y : 'LOCATION_Y',
    res_files : 'FILES',
    res_start_param : 'START_PARAM',
    res_final_type : 'FINAL_TYPE',
    res_final_desc : 'FINAL_TYPE_DESCRIPTION',
    res_final_message : 'FINAL_MESSAGE',
}

const RESULT_DESC = {
    res_address_manual : 'Адрес введен вручную',
    res_address_geolocation : 'Адрес указан через геолокацию',
    res_terminal_N : 'Номер терминала',
    res_problem_type : 'Тип проблемы',
    res_problem_desc : 'Описание проблемы',
    res_problem : 'Проблема',
    res_contact : 'Имя контакта',
    res_contact_phone : 'Телефон контакта',
    res_cash : 'Сумма покупки',
    res_card : 'Карта',
    res_back_target : 'Куда выполнить возврат',
    res_pay_type : 'Тип оплаты',
    res_need_money_back : 'Требуется возврат',
    res_buy_yes_no : 'Совершена покупка',
    res_buy_desc : 'Описание покупки',
    res_need_recall : 'Требуется обратный звонок',
    res_location_X : 'Геолокация X',
    res_location_Y : 'Геолокация Y',
    res_files : 'Файлы',
    res_start_param : 'Начальный параметр',
    res_final_type : 'Тип завершения',
    res_final_desc : 'Описание типа завершения',
    res_final_message : 'Сообщение при завершении',
}

const B24_FIELDS = {
    res_address_manual : 'ADDRESS_MANUAL',
    res_address_geolocation : 'ADDRESS_GEOLOCATION',
    res_terminal_N : 'TERMINAL_N',
    res_problem_type : 'PROBLEM_TYPE',
    res_problem_desc : 'PROBLEM_DESCRIPTION',
    res_problem : 'PROBLEM',
    res_contact : 'CONTACT',
    res_contact_phone : 'PHONE',
    res_cash : 'CASH',
    res_card : 'CARD',
    res_back_target : 'CHARGEBACK_TARGET',
    res_pay_type : 'PAY_TYPE',
    res_need_money_back : 'MONEY_BACK',
    res_buy_yes_no : 'BUY_YES_NO',
    res_buy_desc : 'BUY_DESCRIPTION',
    res_need_recall : 'NEED_RECALL',
    res_location_X : 'LOCATION_X',
    res_location_Y : 'LOCATION_Y',
    res_files : 'FILES',
    res_start_param : 'START_PARAM',
    res_final_type : 'FINAL_TYPE',
    res_final_desc : 'FINAL_TYPE_DESCRIPTION',
    res_final_message : 'FINAL_MESSAGE',
}

const BOT_SCHEME = {
    'start' : {
        stat : '0',
        msg : 'Укажите номер аппарата, указанный над QR-кодом',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '1' : 'Не вижу номер',
            '10' : 'Ввести номер',
        }
    },
    '10' : {
        msg : 'Введите номер торгового автомата (только цифры без пробелов)',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_terminal_N,
        nxt : '2'
    },
    'error' : {
        stat : '6',
        msg : 'Произошла ошибка, попробуйте начать сначала /start',
        typ : SCHEME_TYPES.st_error,
    },
    'final' : {
        msg : '',
        typ : SCHEME_TYPES.st_final,
        fnl : '0'
    },
    '1' : {
        msg : 'Укажите точный адрес местонахождения торгового автомата',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '11' : 'Ввести адрес самостоятельно',
            '12' : 'Указать геолокацию',
        }
    },
    '11' : {
        msg : 'Введите адрес',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_address_manual,
        nxt : '2'
    },
    '12' : {
        msg : 'Укажите адрес',
        typ : SCHEME_TYPES.st_coordinates,
        key : RESULT_KEYS.res_address_geolocation,
        nxt : '2'
    },
    '2' : {
        msg : 'Какой вопрос Вас интересует? Выберите подходящий вариант из списка.',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '21' : 'Проблемы с выдачей',
            '22' : 'Проблема с оплатой',
            '23' : 'Качество товара',
            '24' : 'Наполнение автомата',
            '25' : 'Внешний вид',
            '26' : 'Нет подходящего варианта',
        }
    },
    '21' : {
        msg : 'Проблемы с выдачей',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem_type,
        nxt : '3'
    },
    '22' : {
        msg : 'Проблема с оплатой',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem_type,
        nxt : '4'
    },
    '23' : {
        msg : 'Качество товара',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem_type,
        nxt : '4'
    },
    '24' : {
        msg : 'Наполнение автомата',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem_type,
        nxt : '240'
    },
    '240' : {
        msg : 'Опишите, пожалуйста, какой товар или ингредиент закончился?',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_problem_desc,
        nxt : '2_final',
        stat : '4',
    },
    '25' : {
        msg : 'Внешний вид',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem_type,
        nxt : '250'
    },
    '250' : {
        msg : 'Опишите, пожалуйста, подробно ситуацию. Приложите фото, если есть такая возможность. (Пустое сообщение, в котором только фото не отправится)',
        typ : SCHEME_TYPES.st_file,
        key : RESULT_KEYS.res_problem_desc,
        nxt : '2_final',
        stat : '4',
    },
    '2_final' : {
        msg : '',
        typ : SCHEME_TYPES.st_final_B24,
        nxt : '',
        fnl : '1'
    },
    '26' : {
        msg : 'Нет подходящего варианта',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem_type,
        nxt : '7'
    },
    '3' : {
        msg : 'Выберите подходящее описание.',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '31' : 'Не выдал стакан',
            '32' : 'Не выдал напиток/товар',
            '33' : 'Не налил/не долил воду',
            '34' : 'Опрокинул стакан',
            '35' : 'Не выдал размешиватель',
            '36' : 'Нет подходящего варианта',
            '37' : 'Связаться с оператором',
        }
    },
    '31' : {
        msg : 'Не выдал стакан',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '4'
    },
    '32' : {
        msg : 'Не выдал напиток/товар',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '4'
    },
    '33' : {
        msg : 'Не налил/не долил воду',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '4'
    },
    '34' : {
        msg : 'Опрокинул стакан',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '4'
    },
    '35' : {
        msg : 'Не выдал размешиватель',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '4'
    },
    '36' : {
        msg : 'Нет подходящего варианта',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '4'
    },
    '37' : {
        msg : 'Связаться с оператором',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_problem,
        nxt : '71'
    },
    '4' : {
        msg : 'Опишите, пожалуйста, ситуацию подробно',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_problem_desc,
        nxt : '5'
    },
    '5' : {
        msg : 'Требуется ли возврат средств?',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '51' : 'Да',
            '52' : 'Нет',
        }
    },
    '51' : {
        msg : 'Требуется возврат',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_need_money_back,
        nxt : '6'
    },
    '52' : {
        msg : 'Возврат не требуется',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_need_money_back,
        nxt : '2_final',
        stat : '4',
    },
    '6' : {
        msg : 'Для возврата средств необходимо уточнить Ваши данные',
        typ : SCHEME_TYPES.st_msg,
        nxt : '61'
    },
    '61' : {
        msg : 'Оставьте свои контактные данные',
        typ : SCHEME_TYPES.st_contact,
        key : RESULT_KEYS.res_contact,
        nxt : '62'
    },
    '62' : {
        msg : 'Какая сумма была внесена?',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_cash,
        nxt : '63'
    },
    '63' : {
        msg : 'Укажите способ оплаты',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '64' : 'Карта',
            '65' : 'Наличные',
        }
    },
    '64' : {
        msg : 'Оплата картой',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_pay_type,
        nxt : '66'
    },
    '65' : {
        msg : 'Оплата наличными',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_pay_type,
        nxt : '66'
    },
    '66' : {
        msg : 'Вы выбрали товар?',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '67' : 'Да',
            '68' : 'Нет',
        }
    },
    '67' : {
        msg : 'Да',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_buy_yes_no,
        nxt : '69'
    },
    '68' : {
        msg : 'Нет',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_buy_yes_no,
        nxt : '690',
    },
    '69' : {
        msg : 'Какой товар Вы выбрали?',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_buy_desc,
        nxt : '690',
    },
    '690' : {
        msg : 'Куда вернуть средства?',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '691' : 'На карту',
            '693' : 'На счет телефона',
        }
    },
    '691' : {
        msg : 'Введите номер карты',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_card,
        nxt : '692',
    },
    '692' : {
        msg : 'Возврат на карту',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_back_target,
        nxt : '6_final',
        stat : '5',
    },
    '693' : {
        msg : 'Возврат на счет телефона',
        typ : SCHEME_TYPES.st_data,
        key : RESULT_KEYS.res_back_target,
        nxt : '6_final',
        stat : '5',
    },
    '6_final' : {
        msg : '',
        typ : SCHEME_TYPES.st_final_B24,
        nxt : '',
        fnl : '2'
    },
    '7' : {
        msg : 'Выберите подходящий вариант из списка.',
        typ : SCHEME_TYPES.st_selecter,
        ops : {
            '71' : 'Связаться с оператором',
            '72' : 'Нужна горячая линия',
            '73' : 'Описать ситуацию подробно',
        }
    },
    '71' : {
        msg : 'Ваше обращение будет передано ответственному специалисту. Укажите свои контактные данные для связи',
        typ : SCHEME_TYPES.st_contact,
        key : RESULT_KEYS.res_contact,
        nxt : '7_final',
        stat : '2',
    },
    '72' : {
        msg : 'Для обращения на горячую линию Вам необходимо позвонить по телефону:',
        typ : SCHEME_TYPES.st_send_contact,
        key : 'HOT_LINE',
        nxt : '72_final',
        stat : '3',
    },
    '72_final' : {
        msg : '',
        typ : SCHEME_TYPES.st_final,
        fnl : '0',
    },
    '73' : {
        msg : 'Опишите, пожалуйста, ситуацию подробно',
        typ : SCHEME_TYPES.st_text,
        key : RESULT_KEYS.res_problem_desc,
        nxt : '51'
    },
    '7_final' : {
        msg : '',
        typ : SCHEME_TYPES.st_final_B24,
        nxt : '',
        fnl : '3'
    },
}

const USER_POSITION = {};
const PROBLEM_DATA = {};
const USER_LAST_ACTIVE = {};
const CURRENT_SELECTER = {};
const TIME_OUT_LIMIT = 10 * 60 * 1000;
const TIME_OUT_STOP_STADIES = ['final', 'start', '2_final', '6_final', '7_final', '72_final'];
const FILES_COUNTER = {};

function Time_Out(chatId){
    if (TIME_OUT_STOP_STADIES.includes((USER_POSITION[chatId]))){
        return;
    }
    const t = USER_LAST_ACTIVE[chatId];
    setTimeout (() => {
        if (USER_LAST_ACTIVE[chatId] === t){
            PROBLEM_DATA[chatId].res_final_desc = STATISTIC_FINAL_TYPE['1'];
            PROBLEM_DATA[chatId].res_final_type = '0';
            PROBLEM_DATA[chatId].res_final_message = FINAL_TYPE['0'];
            B24_Export(chatId);
            PROBLEM_DATA[chatId] = {};
            USER_POSITION[chatId] = 'final';
            Send_Statistic('1');
            Move_To_Position(chatId);
        }
    }, TIME_OUT_LIMIT)
}

async function Send_Statistic(ind){
    try{
        if (STATISTIC_FINAL_TYPE[ind]){
            if (ind == '0'){
                const URL = BX_STAT_URL + '&PARAMETERS[START_PLUS]=' + encodeURI(STATISTIC_FINAL_TYPE[ind]) + '&PARAMETERS[FINISH_TYPE]=&PARAMETERS[COMMAND]=';
                //console.log('STATISTIC: ', ind);
                //console.log(URL);
                await fetch(URL);
            } else {
                const URL = BX_STAT_URL + '&PARAMETERS[FINISH_TYPE]=' + encodeURI(STATISTIC_FINAL_TYPE[ind]) + '&PARAMETERS[START_PLUS]=&PARAMETERS[COMMAND]=';
                //console.log('STATISTIC: ', ind);
                //console.log(URL);
                await fetch(URL);
            }
        }
    } catch (error){
        console.log('Statistic error');
        console.log(error);
    }
}

async function Move_To_Position(chatId){
    if (!USER_POSITION[chatId]){
        USER_POSITION[chatId] = 'error';
        Move_To_Position(chatId);
        return;
    }
    USER_LAST_ACTIVE[chatId] = new Date;
    Time_Out(chatId);
    const pos = USER_POSITION[chatId];
    //console.log('Move : ', pos);
    //console.log(PROBLEM_DATA[chatId]);
    if (!BOT_SCHEME[pos]){
        USER_POSITION[chatId] = 'error';
        Move_To_Position(chatId);
        return;
    }
    const msg = BOT_SCHEME[pos].msg;
    const typ = BOT_SCHEME[pos].typ;
    if (BOT_SCHEME[pos].stat){
        PROBLEM_DATA[chatId][RESULT_KEYS.res_final_desc] = STATISTIC_FINAL_TYPE[BOT_SCHEME[pos].stat];
        await Send_Statistic(BOT_SCHEME[pos].stat);
    }
    try{
        if (typ === SCHEME_TYPES.st_selecter){
            const keyb = [];
            CURRENT_SELECTER[chatId] = [];
            for (let key in BOT_SCHEME[pos].ops){
                CURRENT_SELECTER[chatId].push(key);
                keyb.push([
                    {
                        text : BOT_SCHEME[pos].ops[key],
                        callback_data : key
                    }
                ]);
            }
            const opts = {
                reply_markup : JSON.stringify({
                    inline_keyboard : keyb
                })
            };
            await BOT.sendMessage(chatId, msg, opts);
            return;
        }
        if (typ === SCHEME_TYPES.st_error){
            await BOT.sendMessage(chatId, msg);
            USER_POSITION[chatId] = 'start';
            return;
        }
        if (typ === SCHEME_TYPES.st_final){
            //По желанию заказчика добавляем в простой финал тоже передачу данных в Б24

            await BOT.sendMessage(chatId, FINAL_TYPE[BOT_SCHEME[pos].fnl], {
                reply_markup: {
                    remove_keyboard : true
                }
            });
            PROBLEM_DATA[chatId][RESULT_KEYS.res_final_type] = BOT_SCHEME[pos].fnl;
            PROBLEM_DATA[chatId][RESULT_KEYS.res_final_message] = FINAL_TYPE[BOT_SCHEME[pos].fnl];
            await B24_Export(chatId);
            USER_POSITION[chatId] = 'start';
            PROBLEM_DATA[chatId] = {};
            return;

            /*
            await BOT.sendMessage(chatId, FINAL_TYPE[BOT_SCHEME[pos].fnl]);
            USER_POSITION[chatId] = 'start';
            PROBLEM_DATA[chatId] = {};
            return;
            */
        }
        if (typ === SCHEME_TYPES.st_text){
            await BOT.sendMessage(chatId, msg);
            return;
        }
        if (typ === SCHEME_TYPES.st_file){
            await BOT.sendMessage(chatId, msg);
            return;
        }
        if (typ === SCHEME_TYPES.st_send_contact){
            await BOT.sendMessage(chatId, msg);
            const cont = BOT_CONTACTS[BOT_SCHEME[pos].key];
            await BOT.sendContact(chatId, cont.phone, cont.name);
            USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
            Move_To_Position(chatId);
            return;
        }
        if (typ === SCHEME_TYPES.st_coordinates){
            const opts = {
                reply_markup : {
                    keyboard : [
                        [{
                            text : SCHEME_TYPES.st_coordinates,
                            request_location : true
                        }]
                    ]
                }
            };
            await BOT.sendMessage(chatId, msg, opts);
            PROBLEM_DATA[chatId][RESULT_KEYS.res_address_geolocation] = 'Да';
            return;
        }
        if (typ === SCHEME_TYPES.st_contact){
            const opts = {
                reply_markup : {
                    keyboard : [
                        [{
                            text : SCHEME_TYPES.st_contact,
                            request_contact : true
                        }]
                    ]
                }
            };
            await BOT.sendMessage(chatId, msg, opts);
            await BOT.sendMessage(chatId, 'Если у вас мобильная или десктопная версия - нажмите "Контактные данные" внизу экрана и после этого дайте согласие на передачу информации');
            await BOT.sendMessage(chatId, 'Для web версии телеграма нажмите значки, как показано на рисунке:');
            await BOT.sendPhoto(chatId,'contacts.png');
            return;
        }
        if (typ === SCHEME_TYPES.st_data){
            //console.log(PROBLEM_DATA);
            //console.log(msg);
            const key = BOT_SCHEME[pos].key;
            PROBLEM_DATA[chatId][key] = BOT_SCHEME[pos].msg;
            USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
            Move_To_Position(chatId);
            return;
        }
        if (typ === SCHEME_TYPES.st_msg){
            await BOT.sendMessage(chatId, msg);
            USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
            Move_To_Position(chatId);
            return;
        }
        if (typ === SCHEME_TYPES.st_final_B24){
            await BOT.sendMessage(chatId, FINAL_TYPE[BOT_SCHEME[pos].fnl], {
                reply_markup: {
                    remove_keyboard : true
                }
            });
            PROBLEM_DATA[chatId][RESULT_KEYS.res_final_type] = BOT_SCHEME[pos].fnl;
            PROBLEM_DATA[chatId][RESULT_KEYS.res_final_message] = FINAL_TYPE[BOT_SCHEME[pos].fnl];
            await B24_Export(chatId);
            USER_POSITION[chatId] = 'start';
            PROBLEM_DATA[chatId] = {};
            return;
        }
    } catch {
        USER_POSITION[chatId] = 'error';
        Move_To_Position(chatId);
    }
}

BOT.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (!PROBLEM_DATA[chatId]){
        PROBLEM_DATA[chatId] = {};
    }
    if (msg.text){
        if ((msg.text.indexOf('/start ') === 0) && (msg.text.length > 13)){
            const par_start = msg.text.substring(7);
            if (par_start.length > 0){
                //Сохраняем переданный параметр
                //await BOT.sendMessage(chatId, 'Параметр запуска: ' + par_start);
                //console.log(PROBLEM_DATA);
                PROBLEM_DATA[chatId] = {};
                PROBLEM_DATA[chatId][RESULT_KEYS.res_start_param] = par_start;
                USER_POSITION[chatId] = 'start';
                Move_To_Position(chatId);
                return;
            }
        }
    }
    try {
        let text = msg.text;
        if (text === '/start'){
            USER_POSITION[chatId] = 'start';
            PROBLEM_DATA[chatId] = {};
            CURRENT_SELECTER[chatId] = [];
            Move_To_Position(chatId);
            return;
        }
        if (USER_POSITION[chatId]){
            const pos = USER_POSITION[chatId];
            //console.log('POSITION : ', pos);
            //console.log(PROBLEM_DATA[chatId]);
            if (msg.photo){
                console.log(msg);
                if (FILES_COUNTER[chatId]){
                    FILES_COUNTER[chatId]++;
                } else {
                    FILES_COUNTER[chatId] = 1;
                }
                if (PROBLEM_DATA[chatId][RESULT_KEYS.res_files] == undefined){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_files] = '';
                }
                //console.log('PHOTO::');
                //console.log(msg);
                const p = await BOT.getFile(msg.photo[msg.photo.length - 1].file_id);
                //console.log('FILE_PATH: ');
                //console.log(p);
                console.log('https://api.telegram.org/file/bot' + API_TOKEN + '/' + p.file_path);
                if (p){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_files] = '' + PROBLEM_DATA[chatId][RESULT_KEYS.res_files] + p.file_path + '|';
                }
                //console.log('WITH PHOTOS:');
                //console.log(PROBLEM_DATA[chatId]);
                if (PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] == undefined){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] = '';
                }
                if (msg.caption){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] = PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] + msg.caption + '  ';
                }
                FILES_COUNTER[chatId]--;
                if (FILES_COUNTER[chatId] == 0){
                    USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                    Move_To_Position(chatId);
                    return;
                }
            }
            if (msg.document){
                console.log(msg);
                if (FILES_COUNTER[chatId]){
                    FILES_COUNTER[chatId]++;
                } else {
                    FILES_COUNTER[chatId] = 1;
                }
                if (PROBLEM_DATA[chatId][RESULT_KEYS.res_files] == undefined){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_files] = '';
                }
                const p = await BOT.getFile(msg.document.file_id);
                console.log('https://api.telegram.org/file/bot' + API_TOKEN + '/' + p.file_path);
                if (p){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_files] = '' + PROBLEM_DATA[chatId][RESULT_KEYS.res_files] + p.file_path + '|';
                }
                if (PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] == undefined){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] = '';
                }
                if (msg.caption){
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] = PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] + msg.caption + '  ';
                }
                FILES_COUNTER[chatId]--;
                if (FILES_COUNTER[chatId] == 0){
                    USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                    Move_To_Position(chatId);
                    return;
                }
            }
            if (BOT_SCHEME[pos].typ === SCHEME_TYPES.st_contact){
                if (!msg.contact){
                    await BOT.sendMessage(chatId, 'Необходимо указать свои контактные данные для обратной связи');
                    //await BOT.sendMessage(chatId, 'Если у вас мобильная или десктопная версия - нажмите "Контактные данные" внизу экрана и после этого дайте согласие на передачу информации');
                    //await BOT.sendMessage(chatId, 'Для web версии телеграма нажмите значки, как показано на рисунке:');
                    //await BOT.sendPhoto(chatId,'contacts.png');
                    Move_To_Position(chatId);
                } else {
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_contact] = msg.contact.first_name;
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_contact_phone] = msg.contact.phone_number;
                    await BOT.sendMessage(chatId, 'Контактные данные сохранены', {
                        reply_markup: {
                            remove_keyboard : true
                        }
                    });
                    USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                    Move_To_Position(chatId);
                }
                return;
            }
            if (BOT_SCHEME[pos].typ === SCHEME_TYPES.st_coordinates){
                if (!msg.location){
                    await BOT.sendMessage(chatId, 'Необходимо указать свою геолокацию');
                    Move_To_Position(chatId);
                } else {
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_location_X] = msg.location.latitude;
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_location_Y] = msg.location.longitude;
                    await BOT.sendMessage(chatId, 'Координаты получены', {
                        reply_markup: {
                            remove_keyboard : true
                        }
                    });
                    USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                    Move_To_Position(chatId);
                }
                return;
            }
            if (BOT_SCHEME[pos].typ === SCHEME_TYPES.st_file){
                console.log(msg);
                if (FILES_COUNTER[chatId]){
                    if (FILES_COUNTER[chatId] > 0){
                        return;
                    }
                }
                if ((!msg.text) && (PROBLEM_DATA[chatId][RESULT_KEYS.res_files])){
                    USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                    Move_To_Position(chatId);
                    return;
                }
                if (msg.text){
                    if (PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] == undefined){
                        PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] = '';
                    }
                    PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] = PROBLEM_DATA[chatId][RESULT_KEYS.res_problem] + msg.text + '  ';
                    USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                    Move_To_Position(chatId);
                    return;
                } else {
                    await BOT.sendMessage(chatId, 'Сообщение не должно быть пустым');
                    Move_To_Position(chatId);
                    return;
                }
            }
            if (BOT_SCHEME[pos].typ === SCHEME_TYPES.st_text){
                if (!msg.text){
                    //console.log('Ошибка с картинками в текстовом ответе');
                    //console.log(msg);
                    if (msg.sticker){
                        await BOT.sendMessage(chatId, 'К сожалению, мы не можем передать оператору такой эмоджи, выберите другой или опишите текстом');
                        Move_To_Position(chatId);
                        return;
                    }
                    await BOT.sendMessage(chatId, 'Сообщение не должно быть пустым');
                    Move_To_Position(chatId);
                    return;
                }
                const key = BOT_SCHEME[pos].key;
                if (key === RESULT_KEYS.res_terminal_N){
                    if (Is_Terminal_N(text)){
                        PROBLEM_DATA[chatId][key] = text;
                        USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                        Move_To_Position(chatId);
                    } else {
                        await BOT.sendMessage(chatId, 'Неверно набран номер аппарата (6-8 цифр, без пробелов и посторонних символов)');
                        Move_To_Position(chatId);
                    }
                }
                if (key === RESULT_KEYS.res_card){
                    if (text.length > 0){
                        if (Bad_Simbols(text)){
                            await BOT.sendMessage(chatId, 'Номер карты не должен содержать специальные символы, такие как #, ?, /, & и др.');
                            Move_To_Position(chatId);
                        } else {
                            PROBLEM_DATA[chatId][key] = text;
                            USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                            Move_To_Position(chatId);
                        }
                    } else {
                        await BOT.sendMessage(chatId, 'Номер карты не должен быть пустым');
                        Move_To_Position(chatId);
                    }
                }
                if (key === RESULT_KEYS.res_address_manual){
                    if (text.length > 0){
                        if (Bad_Simbols(text)){
                            await BOT.sendMessage(chatId, 'Адрес не должен содержать специальные символы, такие как #, ?, /, & и др.');
                            Move_To_Position(chatId);
                        } else {
                            PROBLEM_DATA[chatId][key] = text;
                            USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                            Move_To_Position(chatId);
                        }
                    } else {
                        await BOT.sendMessage(chatId, 'Адрес не должен быть пустым');
                        Move_To_Position(chatId);
                    }
                }
                if ((key === RESULT_KEYS.res_problem_desc) || (key === RESULT_KEYS.res_cash) || (key === RESULT_KEYS.res_buy_desc)){
                    if (Bad_Simbols(text)){
                        await BOT.sendMessage(chatId, 'Сообщение не должно содержать специальные символы, такие как #, ?, /, & и др.');
                        Move_To_Position(chatId);
                    } else {
                        PROBLEM_DATA[chatId][key] = text;
                        USER_POSITION[chatId] = BOT_SCHEME[pos].nxt;
                        Move_To_Position(chatId);
                    }
                }
                return;
            }
        }
        if (FILES_COUNTER[chatId]){
            if (FILES_COUNTER[chatId] > 0){
                return;
            }
        }
        await BOT.sendMessage(chatId, 'Простите, я не понимаю (для старта с начала нажмите команду /start).');
    } catch (err){
        console.error(err);
        await BOT.sendMessage(chatId, 'Простите, что-то пошло не так, давайте начнем сначала (нажмите команду /start)');
    }
});

BOT.on('callback_query', async(msg) => {
    const chatId = msg.message.chat.id;
    //console.log(msg);
    USER_POSITION[chatId] = msg.data;
    if (PROBLEM_DATA[chatId]){
        if (CURRENT_SELECTER[chatId].includes(msg.data)){
            CURRENT_SELECTER[chatId] = [];
            Move_To_Position(chatId);
        } else {
            USER_POSITION[chatId] = 'error';
            CURRENT_SELECTER[chatId] = [];
            Move_To_Position(chatId);
        }
    } else {
        return;
    }
});

function Bad_Simbols(str){
    const bs = '#?/&';
    for (let i = 0; i < bs.length; i++){
        if (str.indexOf(bs[i]) > -1){
            return true;
        }
    }
    return false;
}

function Is_Terminal_N(str){
    if ((str.length >= 6) && (str.length <= 8) && (Number(str))){
        return true;
    } else {
        return false;
    }
}

async function B24_Export(chatId){
    console.log('-RES-');
    console.log(PROBLEM_DATA[chatId]);
    if (PROBLEM_DATA[chatId][RESULT_KEYS.res_location_X] || PROBLEM_DATA[chatId][RESULT_KEYS.res_address_manual] || PROBLEM_DATA[chatId][RESULT_KEYS.res_terminal_N]){
        let URL_PARAMS = '';
        for (p in PROBLEM_DATA[chatId]){
            for (k in RESULT_DESC){
                if (RESULT_KEYS[k] == p){
                    const key = B24_FIELDS[k];
                    URL_PARAMS += `&PARAMETERS[${key}]=${encodeURI(PROBLEM_DATA[chatId][p])}`;
                }
            }
        }
        const URL = BX_URL + URL_PARAMS;
        //console.log(BX_URL);
        console.log(URL);
        await fetch(URL);
    } else {
        await BOT.sendMessage(chatId, 'Произошла какая-то ошибка, попробуйте начать сначала /start');
    }
}

