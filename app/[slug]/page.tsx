import Comments from "@/components/comments/Comments";
import Menu from "@/components/menu/Menu";
import React from "react";

const ProjectDetailPage = () => {
  return (
    <div className="container mx-auto">
      <div>
        <h1>Project Detail Page</h1>
        <img src="/background.jpg" alt="efcd" />
      </div>

      <div>
        <img src="/background.jpg" className="h-10 w-10 rounded-full" alt="" />
        <p>User Name, Date</p>
      </div>

      <div className="flex">
        <p className="flex-[5]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero harum
          cumque vitae sit. In doloremque, aspernatur magni placeat perferendis
          deleniti quidem incidunt. Suscipit ipsam cumque aliquid minus vitae
          eius quibusdam labore optio facilis est. Iusto, voluptatibus aliquid.
          Odio assumenda hic asperiores eum tempora quo pariatur consequatur
          iste, repellendus iure, fugiat repellat, eaque ea. Debitis quo labore
          saepe modi recusandae atque repudiandae, error ea nostrum, soluta
          esse. Fugit velit minima placeat ipsum, incidunt minus assumenda rerum
          voluptatibus neque iusto consequatur nostrum unde magni quam
          aspernatur non saepe nulla odio laborum eaque debitis? Aliquam officia
          sed laboriosam voluptatibus atque dolorem, quam corrupti.
        </p>
        <Menu />
      </div>
      <Comments />
    </div>
  );
};

export default ProjectDetailPage;
