import { createI18n } from "vue-i18n";
import i18nLangs_en from '../../langs/en.js';

const messages = {
  en: i18nLangs_en,
};
const i18n = new createI18n({
  locale: "en",
  legacy: false,
  messages,
});
export default i18n;
