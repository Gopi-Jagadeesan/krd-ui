import React from "react";
import MyContext from "../../../../context/MyContext";
import SideBarItem from "./SideBarItem";

class Index extends React.Component {
  // Render Sidebar list
  renderSideBarList(currentRoute, enable) {
    const navList =
      this.props && this.props.navList
        ? this.props.navList
        : this.props.projectNavList;
    return (
      navList &&
      navList(this.props.settings).map((navigation, key) => (
        <SideBarItem
          projectId={this.props.projectId}
          id={key}
          key={key}
          navigation={navigation}
          currentRoute={currentRoute}
          enable={enable}
        />
      ))
    );
  }

  closeMenuOnBlur = (e, ctx) => {
    if (e.target.classList.contains("site-sidebar")) return;
    ctx.updateMenuToggled();
  };

  // Handle Project
  handleProjectChange = async (values) => {
    const selectedOptionId =
      values &&
      values.values &&
      values.values.projectName &&
      values.values.projectName.value;

    window.location.replace(`/${selectedOptionId}/tickets`);
  };

  render() {
    const currentRoute = window.location.pathname;
    let leftNavStyle = {};
    if (this.props.leftNavigationBackgroundImage) {
      leftNavStyle = {
        background: `url(${this.props.leftNavigationBackgroundImage})`,
        width: "200px",
      };
    }
    const enable = !this.props.enable ? false : true;

    return (
      <MyContext.Consumer>
        {(context) => (
          <>
            <div
              id={"sidebar"}
              className={` d-flex flex-column flex-shrink-0" ${
                context.menuToggled ? "menu-toggled" : "menu-hidden"
              }`}
              onClick={(e) => this.closeMenuOnBlur(e, context)}
              style={leftNavStyle}>
              <nav>
                <ul className="list-unstyled mb-0 pt-2 pb-3">
                  {/*render the sidebar menu*/}
                  {this.renderSideBarList(currentRoute, enable)}
                </ul>
              </nav>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Index;
