import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div
          className="fl
         flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
            beatae aspernatur labore, repudiandae maiores quod, optio pariatur
            sequi reprehenderit culpa corrupti a eos voluptatum nesciunt
            excepturi doloremque quis illum sit dicta suscipit vitae.
            Voluptatem, vero, odit, omnis ullam hic perspiciatis et nisi
            officiis rem unde quidem nesciunt accusamus? Iusto perspiciatis quam
            eius nam repellendus dignissimos vel deleniti minima est, quasi
            voluptate rem. Similique magni ut ipsa sapiente, dicta nihil magnam.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            nisi nemo incidunt excepturi praesentium doloremque ab molestias
            ipsa placeat iste necessitatibus, veritatis id debitis nobis eum
            sit. Quae, inventore alias dolorem, expedita, ab aut ex dolores
            velit in et officia!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae in
            exercitationem sapiente praesentium illo eos quas voluptas
            dignissimos, quaerat, adipisci aut rerum fugit. Quam dignissimos
            odio architecto aut optio fugiat.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-10 flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum pariatur veritatis quas nulla dicta consequuntur id esse. Obcaecati architecto minima placeat adipisci velit voluptatem? Impedit, voluptas reiciendis. Iste, consectetur quod!</p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-10 flex-col gap-5">
          <b>Convinience</b>
          <p className="text-gray-600 mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet ad consequatur minima possimus debitis! Eaque, commodi similique? Deserunt, consectetur, perferendis illum facere eaque expedita aliquid vel quaerat cum, aliquam nam!</p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-10 flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore delectus voluptatem amet officia neque magni animi laudantium maiores expedita laborum quos natus nobis assumenda, culpa cum ea incidunt tempore enim?</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
