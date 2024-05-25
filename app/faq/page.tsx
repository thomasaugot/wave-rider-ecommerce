import React from "react";

import "@/styles/shared-styles.scss";

export default function FAQ() {
  return (
    <div className="container">
      <div className="container__header">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="container__content">
        <div className="container__item">
          <h2>What is Wave Rider Surf Shop?</h2>
          <p>
            Wave Rider Surf Shop is a personal project created for training and
            educational purposes. It is a mock e-commerce platform to showcase
            my skills in web development using NextJS, TypeScript, SCSS, and
            Redux.
          </p>
        </div>
        <div className="container__item">
          <h2>Is this a real store?</h2>
          <p>
            No, this is not a real store. It is a fake e-commerce site designed
            for personal development and training. No actual transactions or
            sales take place on this site.
          </p>
        </div>
        <div className="container__item">
          <h2>What technologies are used in this project?</h2>
          <p>
            This project is built using NextJS, TypeScript, SCSS, and Redux.
            These technologies are used to create a modern, responsive, and
            interactive web application.
          </p>
        </div>
        <div className="container__item">
          <h2>Can I buy products from this site?</h2>
          <p>
            No, you cannot buy products from this site. It is a demo site for
            educational purposes only. Any products, articles, and images are
            used for illustrative purposes and do not represent real items for
            sale.
          </p>
        </div>
        <div className="container__item">
          <h2>Is my data safe on this site?</h2>
          <p>
            Since this is a training project, data security is a simulated
            aspect of the site. While it implements common security practices,
            it is not intended for real use. Please do not enter any real
            personal or sensitive information.
          </p>
        </div>
        <div className="container__item">
          <h2>How can I contact the developer?</h2>
          <p>
            If you have any questions or comments about this project, you can
            reach the developer at: thomas.augot@hotmail.fr
          </p>
        </div>
      </div>
    </div>
  );
}
