// Features
import Menu from "./menu/menu";
import Notifications from "./notifications/notifications";
import Context from "./context/context";

// StyleSheets
import "./features.css";
import "./items/items.css";
import "./items/line/line.css";
import "./items/separator/separator.css";
import "./items/checkbox/checkbox.css";
import "./items/list/list.css";
import "./items/slider/slider.css";
import Modal from "./modals/modals";

function Features() {
  return (
    <div id="zUI-FeaturesContainer">
      <Menu />
      <Notifications />
      <Context />
      <Modal />
    </div>
  );
}

export default Features;
