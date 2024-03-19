import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Offcanvas, Table } from "react-bootstrap";
import { useRouter } from "next/router";

const INITIAL_VALUES = {
  full_name: "",
  email: "",
  mobile: "",
  is_active: 0,
  avatar: "",
};

const Header = () => {
  const router = useRouter();

  function getCookie(name: any) {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  }
  const myCookie = getCookie("theme");

  useEffect(() => {
    if (myCookie === "dark") {
      document
        .querySelector(".btn-theme-toggle > span")
        ?.classList.remove("fa-moon-stars");
      document
        .querySelector(".btn-theme-toggle > span")
        ?.classList.add("fa-sun-bright");
      document.body.classList.add("dark-theme");
    } else {
      document
        .querySelector(".btn-theme-toggle > span")
        ?.classList.add("fa-moon-stars");
      document
        .querySelector(".btn-theme-toggle > span")
        ?.classList.remove("fa-sun-bright");
      document.body.classList.add("light-theme");
    }
  }, [myCookie]);

  const TempletTheme = () => {
    const currentTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    // Toggle the theme class
    document.body.classList.toggle("dark-theme");
    // Update the cookie with the new theme
    setCookie("theme", currentTheme, 7);
  };

  const setCookie = (name: any, value: any, days: any) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  function handleLogout() {
    window.localStorage.clear();
    router.replace("/auth/login");
  }

  // My profile

  const [userState, setUserState] = useState(INITIAL_VALUES);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => {
    setShowOffCanvas(false);
  };

  const handleMyProfile = () => {
    setShowOffCanvas(true);

    const userData = JSON.parse(window.localStorage.getItem("userData")!);

    setUserState(userData);
  };

  const user = {
    Name: userState.full_name,
    Email: userState.email,
    Mobile: userState.mobile,
    Status: userState.is_active === 0 ? "Inactive" : "Active",
  };
  const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
  return (
    <>
      <div className="app-header header">
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand" href="#">
              <img
                src={`${BASE_URL}/assets/img/brand/demo_logo.png`}
                className="header-brand-img desktop-lgo"
                alt="Polly logo"
              />
              <img
                src={`${BASE_URL}/assets/img/brand/demo_favicon.png`}
                className="header-brand-img mobile-logo"
                alt="Polly logo"
              />
            </a>
            <div
              className="app-sidebar__toggle nav-link icon"
              data-toggle="sidebar"
            >
              {/* <span
                className="fa fa-align-left header-icon"
                style={{ background: "none", cursor: "pointer" }}
              /> */}
            </div>
            {/* MENU BAR */}
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown header-notify">
                {/* <a className="nav-link icon" data-bs-toggle="dropdown">
                  <span className="header-icon fa-regular fa-bell pr-3" />
                  <span className="pulse " />
                </a> */}
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow  animated">
                  <div className="d-flex dropdown-header">
                    <h6 className="mb-0 fs-12 font-weight-bold notification-dark-theme">
                      <span id="total-notifications" />{" "}
                      <span className="text-primary">New</span> Notification(s)
                    </h6>
                    <a
                      href="#"
                      className="mb-1 badge badge-primary ml-auto pl-3 pr-3 mark-read"
                      id="mark-all"
                    >
                      Mark All Read
                    </a>
                  </div>
                  <div className="notify-menu">
                    <div className="notify-menu-inner">
                      <div className="d-flex dropdown-item border-bottom pl-4 pr-4">
                        <div>
                          <a href="#" className="d-flex">
                            <div className="notifyimg bg-info-transparent text-info">
                              {" "}
                              <i className="fa-solid fa-user-check fs-18" />
                            </div>
                            <div className="mr-6">
                              <div
                                className="font-weight-bold fs-12 notification-dark-theme"
                                onClick={handleLogout}
                              >
                                New User Registered
                              </div>
                              <div className="text-muted fs-10">
                                Name: Reena
                              </div>
                              <div className="small text-muted fs-10">
                                1 week ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="badge badge-primary mark-read mark-as-read"
                            data-id="a0089856-0537-4035-9a9a-2acbed099ea5"
                          >
                            Mark as Read
                          </a>
                        </div>
                      </div>
                      <div className="d-flex dropdown-item border-bottom pl-4 pr-4">
                        <div>
                          <a href="#" className="d-flex">
                            <div className="notifyimg bg-info-transparent text-info">
                              {" "}
                              <i className="fa-solid fa-user-check fs-18" />
                            </div>
                            <div className="mr-6">
                              <div className="font-weight-bold fs-12 notification-dark-theme">
                                New User Registered
                              </div>
                              <div className="text-muted fs-10">
                                Name: Sakshi
                              </div>
                              <div className="small text-muted fs-10">
                                1 week ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="badge badge-primary mark-read mark-as-read"
                            data-id="4dc7a69c-7abb-49cd-b6f6-69044703c248"
                          >
                            Mark as Read
                          </a>
                        </div>
                      </div>
                      <div className="d-flex dropdown-item border-bottom pl-4 pr-4">
                        <div>
                          <a href="#" className="d-flex">
                            <div className="notifyimg bg-info-transparent text-info">
                              {" "}
                              <i className="fa-solid fa-user-check fs-18" />
                            </div>
                            <div className="mr-6">
                              <div className="font-weight-bold fs-12 notification-dark-theme">
                                New User Registered
                              </div>
                              <div className="text-muted fs-10">
                                Name: some name
                              </div>
                              <div className="small text-muted fs-10">
                                2 weeks ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="badge badge-primary mark-read mark-as-read"
                            data-id="55b198a9-40d0-4538-9250-c9a78c1f228f"
                          >
                            Mark as Read
                          </a>
                        </div>
                      </div>
                      <div className="d-flex dropdown-item border-bottom pl-4 pr-4">
                        <div>
                          <a href="#" className="d-flex">
                            <div className="notifyimg bg-info-transparent text-info">
                              {" "}
                              <i className="fa-solid fa-user-check fs-18" />
                            </div>
                            <div className="mr-6">
                              <div className="font-weight-bold fs-12 notification-dark-theme">
                                New User Registered
                              </div>
                              <div className="text-muted fs-10">
                                Name: Karthick
                              </div>
                              <div className="small text-muted fs-10">
                                3 weeks ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="badge badge-primary mark-read mark-as-read"
                            data-id="3b54d76a-784f-4af2-95b7-77961e29703f"
                          >
                            Mark as Read
                          </a>
                        </div>
                      </div>
                      <div className="d-flex dropdown-item border-bottom pl-4 pr-4">
                        <div>
                          <a href="#" className="d-flex">
                            <div className="notifyimg bg-info-transparent text-info">
                              {" "}
                              <i className="fa-solid fa-user-check fs-18" />
                            </div>
                            <div className="mr-6">
                              <div className="font-weight-bold fs-12 notification-dark-theme">
                                New User Registered
                              </div>
                              <div className="text-muted fs-10">
                                Name: Syed Hussain
                              </div>
                              <div className="small text-muted fs-10">
                                1 month ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="badge badge-primary mark-read mark-as-read"
                            data-id="b0f399e1-16e3-4c43-9639-60ebfe0becb5"
                          >
                            Mark as Read
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="view-all-button text-center">
                    <a
                      href="#"
                      className="fs-12 font-weight-bold notification-dark-theme"
                    >
                      View All Notifications
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="dropdown items-center flex"
                onClick={TempletTheme}
              >
                <Link href="#" className="nav-link icon btn-theme-toggle">
                  <span className="header-icon fa-sharp fa-solid fa-moon-stars" />
                </Link>
              </div>
              {/* <div className="dropdown header-expand">
                <a className="nav-link icon" id="fullscreen-button">
                  <span
                    className="header-icon fa-solid fa-expand"
                    id="fullscreen-icon"
                  />
                </a>
              </div> */}
              <div className="dropdown header-locale"></div>

              <Dropdown align="end" className="profile-dropdown">
                <Dropdown.Toggle
                  as={Nav.Link}
                  className="nav-link custom-toggles"
                >
                  <span className="float-right">
                    <img
                      src={`${BASE_URL}/assets/img/users/avatar.jpg`}
                      alt="img"
                      className="avatar avatar-md"
                    />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  // align="right"
                  className="dropdown-menu dropdown-menu-right dropdown-menu-arrow animated"
                >
                  <div className="text-center pt-2">
                    <span className="text-center user fs-12 pb-0 font-weight-bold">
                      Admin
                    </span>
                    <br />
                    <span className="text-center fs-12 text-muted">
                      Administrator
                    </span>
                    <div className="dropdown-divider mt-3" />
                  </div>
                  {/* <Dropdown.Item as="a" className="dropdown-item d-flex">
                    <span className="profile-icon fa-solid fa-box-check" />
                    <span className="fs-12">Subscriptions</span>
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    as="a"
                    className="dropdown-item d-flex"
                    style={{ cursor: "pointer" }}
                    onClick={handleMyProfile}
                  >
                    <span className="profile-icon fa-solid fa-id-badge" />
                    <span className="fs-12">My Profile</span>
                  </Dropdown.Item>
                  <Offcanvas
                    show={showOffCanvas}
                    onHide={handleCloseOffCanvas}
                    placement="end"
                    style={{ width: "500px" }}
                  >
                    <Offcanvas.Header>
                      <Offcanvas.Title>My Profile</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="card-body p-2 app-info-form">
                      <div className="box-content">
                        <div className="widget-user-image overflow-hidden mx-auto mt-3 mb-5 w-150 h-150">
                          <img
                            alt="Avatar"
                            className="rounded-circle"
                            src={
                              !userState.avatar
                                ? "http://138.68.129.51:8000/public/uploads/user/avatar.jpg"
                                : userState.avatar
                            }
                          />
                        </div>
                        <Table className="table mb-0">
                          <tbody>
                            {Object.entries(user).map(([key, value]: any) => (
                              <tr key={key} className="view-content">
                                <td className="py-2 px-0 border-top-0">
                                  <span
                                    className="font-weight-semibold w-50"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {key}
                                  </span>
                                </td>
                                <td className="py-2 px-0 border-top-0">
                                  {value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                  {/* <Dropdown.Item as="a" className="dropdown-item d-flex">
                    <span className="profile-icon fa-solid fa-lock-hashtag" />
                    <div className="fs-12">Change Password</div>
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    as="a"
                    className="dropdown-item d-flex"
                    onClick={handleLogout}
                  >
                    <span className="profile-icon fa-solid fa-right-from-bracket" />
                    <div className="fs-12">Logout</div>
                  </Dropdown.Item>
                  <form
                    id="logout-form"
                    action="#"
                    method="POST"
                    className="d-none"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="rQ0LC9yj8p7myi0KpKekssAg9Z3KGgVlbIRsBzFF"
                    />
                  </form>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* END MENU BAR */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
