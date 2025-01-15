import { AtmospherePreview } from "./AtmospherePreview";
import { ContactsPreview } from "./ContactsPreview";
import { FeaturesPreview } from "./FeaturesPreview";
import { HistoryPreview } from "./HistoryPreview";
import { MainPreview } from "./MainPreview";
import { MenuPreview } from "./MenuPreview";

const getPreviewTitle = (tab: string) => {
  switch (tab) {
    case "main":
      return "основной информации";
    case "history":
      return "истории бренда";
    case "atmosphere":
      return "атмосферы";
    case "features":
      return "особенностей";
    case "menu":
      return "меню";
    case "contacts":
      return "контактов";
    default:
      return "";
  }
};

export {
    AtmospherePreview,
    ContactsPreview,
    FeaturesPreview, getPreviewTitle, HistoryPreview,
    MainPreview,
    MenuPreview
};
