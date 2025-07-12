import { CanvasLayoutType, LayoutTree } from "../types/common";

export interface ILayout {
  type: CanvasLayoutType;
  name: string;
  viewport: {
    width?: number;
  };
}

export const layoutConfig: ILayout[] = [
  { type: "Desktop", name: "Desktop", viewport: {} },
  { type: "Tablet", name: "Tablet", viewport: { width: 768 } },
  { type: "Mobile", name: "Mobile", viewport: { width: 375 } },
];

export const defaultLayoutTree: LayoutTree = {
  // root: {
  //   type: "document",
  //   id: "document",
  //   children: [],
  // },

  root: {
    type: "document",
    id: "document",
    children: [
      {
        type: "box",
        id: "header-box",
        props: {
          style: [
            {
              type: "layout",
              properties: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#f5f5f5",
              },
            },
            {
              type: "typography",
              properties: {
                fontSize: "1.25rem",
                fontWeight: "bold",
              },
            },
          ],
        },
        children: [
          {
            type: "box",
            id: "logo-box",
            children: "MyLandingPage",
          },
          {
            type: "box",
            id: "nav-box",
            children: [
              {
                type: "button",
                id: "nav-features",
                props: {
                  style: [],
                },
                children: "Features",
              },
              {
                type: "button",
                id: "nav-contact",
                props: {
                  style: [],
                },
                children: "Contact",
              },
            ],
          },
        ],
      },
      {
        type: "box",
        id: "hero-section",
        props: {
          style: [
            {
              type: "layout",
              properties: {
                padding: "2rem",
                textAlign: "center",
              },
            },
            {
              type: "typography",
              properties: {
                fontSize: "2rem",
                fontWeight: "600",
              },
            },
          ],
        },
        children: [
          {
            type: "box",
            id: "hero-title",
            children: "Welcome to My Landing Page",
          },
          {
            type: "box",
            id: "hero-subtitle",
            children: "We build beautiful interfaces fast.",
          },
          {
            type: "input",
            id: "email-input",
            props: {
              attributes: {
                placeholder: "Enter your email",
                type: "email",
              },
              style: [],
            },
          },
          {
            type: "button",
            id: "cta-button",
            children: "Get Started",
          },
        ],
      },
      {
        type: "box",
        id: "footer",
        props: {
          style: [
            {
              type: "layout",
              properties: {
                position: 'relative',
              },
            },
            {
              type: "typography",
              properties: {
                fontSize: "0.875rem",
              },
            },
          ],
          attributes: {
            className: "footer-text",
            custom: "footer-text",
          },
        },
        children: "© 2025 MyLandingPage. All rights reserved.",
      },
    ],
  },
};
