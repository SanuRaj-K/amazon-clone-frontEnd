import React, { useContext } from "react";
import "./Home.css";
import { myContext } from "../../App";
function Home() {
  const { data } = useContext(myContext);
  const mobile = data.filter((prod) => prod.Category === "Mobiles");
  const Furniture = data.filter((prod) => prod.Category === "Furniture");
  const Home_Appliances = data.filter(
    (prod) => prod.Category === "Home Appliances"
  );

  const scrool = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const Electronics = data.filter((prod) => prod.Category === "Electronics");
  const DisplayMob = mobile.slice(0, 4);
  const DisplayElc = Electronics.slice(0, 4);
  const DisplayFurniture = Furniture.slice(0, 4);
  const DisplayHome = Home_Appliances.slice(0, 4);
  const dealsData = Home_Appliances.slice(0, 6);
  const dealsElectronics = Electronics.slice(0, 6);

  return (
    <>
      <div className="z-50">
        <section id="spotlight">
          <section className="wrapper">
            <div className="one common">
              <h3 className=" 	">Pick up where you let off</h3>

              <div className=" grid grid-cols-2">
                {DisplayFurniture.map((prod) => {
                  return (
                    <section className="set">
                      <img src={prod.Image} alt={prod.Title} width={"20px"} />
                      <span className=" truncate">{prod.Title}</span>
                    </section>
                  );
                })}
              </div>
            </div>
            <div className="two common">
              <h3 className=" 	">Mobiles for you</h3>
              <div className=" grid grid-cols-2">
                {DisplayMob.map((prod) => {
                  return (
                    <section className="set">
                      <img src={prod.Image} alt={prod.Title} width={"20px"} />
                      <span className=" truncate">{prod.Title}</span>
                    </section>
                  );
                })}
              </div>
            </div>
            <div className="three common">
              <h3 className="">Furniture and Home Appliances</h3>
              <div className=" grid grid-cols-2">
                {DisplayHome.map((prod) => {
                  return (
                    <section className="set">
                      <img src={prod.Image} alt={prod.Title} width={"20px"} />
                      <span className=" truncate">{prod.Title}</span>
                    </section>
                  );
                })}
              </div>
            </div>
            <div className="four common">
              <h3 className=" 	">Accessories for computer and laptop</h3>
              <div className=" grid grid-cols-2">
                {DisplayElc.map((prod) => {
                  return (
                    <section className="set">
                      <img src={prod.Image} alt={prod.Title} width={"20px"} />
                      <span className=" truncate">{prod.Title}</span>
                    </section>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
        <section id="deals">
          <section className="deals-wrapper">
            <div className="deals-top">
              <h2>Today's Deals</h2>
              <span className="cursor-pointer">see all deals</span>
            </div>
            <div className=" flex w-full justify-evenly">
              {dealsData.map((prod) => {
                return (
                  <div class="  cursor-pointer relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-[200px]">
                    <div class="h-auto overflow-hidden">
                      <div class="h-44 overflow-hidden relative">
                        <img
                          src={prod.Image}
                          alt={prod.Title}
                          className=" w-fit"
                        />
                      </div>
                    </div>
                    <div class="bg-white py-4 px-3">
                      <h3 class="text-xs mb-2 font-medium truncate">
                        {prod.Title}
                      </h3>
                      <div class="flex justify-between items-center">
                        <p class="text-xs font-semibold text-white mt-3  bg-red-600 px-2 py-1 rounded-md">
                          Deal of the Day
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="searched">
            <div className="deals-top">
              <h2>Most Loved Electronics....</h2>
              <span className="cursor-pointer">see all deals</span>
            </div>
            <div className=" flex w-full justify-evenly">
              {dealsElectronics.map((prod) => {
                return (
                  <div class="  cursor-pointer relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-[200px]">
                    <div class="h-auto overflow-hidden">
                      <div class="h-44 overflow-hidden bg-white flex justify-center relative">
                        <img
                          src={prod.Image}
                          alt={prod.Title}
                          className=" w-fit"
                        />
                      </div>
                    </div>
                    <div class="bg-white py-4 px-3">
                      <h3 class="text-xs mb-2 font-medium truncate">
                        {prod.Title}
                      </h3>
                      <div class="flex justify-between items-center">
                        <p class="text-xs font-semibold text-white mt-3  bg-red-600 px-2 py-1 rounded-md">
                          Most loved
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
        <div
          className=" bg-[#E3E6E6] flex justify-center font-semibold border- cursor-pointer text-[20px]"
          onClick={scrool}
        >
          Back to top
        </div>
      </div>
    </>
  );
}

export default Home;
