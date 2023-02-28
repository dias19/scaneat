/* eslint-disable max-len */
import step1 from '../../assets/images/step1.png';
import step2 from '../../assets/images/step2.png';
import step3 from '../../assets/images/step3.png';
import step4 from '../../assets/images/step4.png';

export const StepsDetails = [
  {
    photo: step1,
    step: 1,
    description: 'Зарегистрируйте свое заведение. И распечатайте QR',
  },
  {
    photo: step2,
    step: 2,
    description: 'Клиент сканирует QR и открывает меню без установки приложения.',
  },
  {
    photo: step3,
    step: 3,
    description: 'Клиент собирает заказ по желанию и совершает заказ.',
  }, {
    photo: step4,
    step: 4,
    description: 'Сотрудники заведения получат заказ в реальном времени.',
  },

];

export const FAQs = [
  {
    question: 'Как сгенерировать QR код для меню?',
    answer: 'Scaneat создает электронный QR код автоматически, при подключению к сервису. Остается только распечатать код и установить на столики.',
  },
  {
    question: 'Можно ли использовать бесконтактное меню, как сайт для ресторана или кафе?',
    answer: 'Можно и нужно. Помимо QR кода, для меню создается ссылка, которой можно делиться в социальных сетях, как владельцам заведения, так и посетителям. ',
  },
  {
    question: 'Получится ли у гостя дистанционно совершить заказ по QR меню?',
    answer: 'Да, Scaneat поддерживает функцию предзаказа блюда удаленно. Бесконтактное меню открывается не только при сканировании QR кода, к нему можно перейти по ссылке, установленной в социальных сетях заведения.',
  },
  {
    question: 'Что я получу, установив бесконтактное меню в своем заведении?',
    answer: 'Главным достоинством Scaneat считается предоставление аналитики посетителей. Владелец заведения будет знать портрет клиента: заказы, пол, возраст, интересы. Scaneat поможет находить потенциальных посетителей, похожих на уже имеющихся и настраивать на них таргетированную рекламу. ',
  },
];
