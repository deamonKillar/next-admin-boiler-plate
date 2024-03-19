import Link from "next/link";
import navItems from "./components/navigation/navItems";
import { Container, Nav } from "react-bootstrap";
import { moduleArray } from "@/context/AuthContext";

const Sidebar = () => {
  const _navItems: any = navItems();
  const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

  let filteredArray: any = [];
  moduleArray.forEach((element: any) => {
    _navItems.forEach((value: any) => {
      if (
        element.name === value.subject &&
        !element.permissions.manage === false
      ) {
        filteredArray.push(value);
      }
    });
  });

  return (
    <>
      <Container className="app-sidebar" style={{ width: "250px" }}>
        <div className="app-sidebar__logo">
          <Nav>
            <Nav.Link href="/" className="header-brand">
              <img
                src={`${BASE_URL}/assets/img/brand/demo_logo.png`}
                className="header-brand-img desktop-lgo"
                alt="Admintro logo"
              />
              <img
                src={`${BASE_URL}/assets/img/brand/demo_favicon.png`}
                className="header-brand-img mobile-logo"
                alt="Admintro logo"
              />
            </Nav.Link>
          </Nav>
        </div>
        <div className="app-sidebar3 ">
          <ul className="side-menu ">
            <li className="side-item side-item-category mt-4 mb-3">
              Admin Panel
            </li>
            {filteredArray.map((item: any) => (
              <li className="slide" key={item.title}>
                {item.action === "handle" ? (
                  <Link className="side-menu__item" href={item.path}>
                    <span
                      className={`side-menu__icon lead-3 fs-18 fa-solid ${item.icon}`}
                    />
                    <span className="side-menu__label">{item.title}</span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Sidebar;
