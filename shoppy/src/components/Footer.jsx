import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-xm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
            porro dignissimos temporibus delectus nostrum quae eaque quaerat
            sapiente. Ea dolores commodi, voluptatem quasi culpa, maiores
            necessitatibus cumque ipsum omnis, corporis maxime molestiae
            repudiandae doloremque quis dolor ratione accusamus vero natus
            quidem officia eos odio amet. Atque molestiae deserunt, nostrum
            earum fuga culpa inventore
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 989-123-1234</li>
            <li>dkshoppy@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center ">
          Copyright 2025@ shoppy.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
