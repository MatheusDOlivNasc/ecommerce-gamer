import React from "react";

const Footer: React.FC = ({}) => {
  return (
    <footer className="bg-purple-100 p-3 shadow-lg">
      <a
        href="https://matheusnascimento.dev"
        target="_blank"
        className="flex justify-center items-center grayscale-[30%] transition-all ease-in-out delay-150 hover:grayscale-0">
        <img src="/matheuson.png" alt="Matheus Nascimento - Desenvolvedor Full Stack" />
      </a>
    </footer>
  );
}

export default Footer