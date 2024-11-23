import aboutImg from "../assets/images/shivam1.jpg";
import { FaExternalLinkAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] max-w-2xl rounded-xl shadow-xl p-3 flex flex-col gap-3">
        <h1 className="text-4xl text-center font-semibold rounded-full">About</h1>
        <div className="w-max flex flex-col">
          <img src={aboutImg} className="w-40 h-40" alt="Image" />
          <h1 className="text-xl font-semibold text-center">Shivam saurabh</h1>
        </div>
        <ul className="list-disc w-max mx-5">
          <li className="hover:underline hover:text-blue-600 cursor-pointer">
            <a
              className="flex items-center gap-2"
              href="https://github.com/Hacker-shivam"
              target="_blank"
            >
              Git-Hub <FaExternalLinkAlt />
            </a>
          </li>
          <li className="hover:underline hover:text-blue-600 cursor-pointer">
            <a
              className="flex items-center gap-2"
              href="https://www.linkedin.com/in/shivam-saurabh-8157b3256/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
            >
              LinkedIn <FaExternalLinkAlt />
            </a>
          </li>
        </ul>
        <p>
        My name is Shivam Saurabh, and I am a web developer with a passion for creating dynamic, user-friendly websites and web applications. I specialize in both front-end and back-end development, utilizing technologies like HTML, CSS, JavaScript, and various server-side languages to bring ideas to life. I focus on building responsive, efficient, and visually appealing web experiences that are tailored to meet the needs of my clients. With a keen eye for detail and a commitment to quality, I strive to deliver solutions that enhance user engagement and performance.
        </p>
      </div>
    </div>
  );
};

export default About;
