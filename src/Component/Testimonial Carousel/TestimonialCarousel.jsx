// import React, { useEffect } from "react";
// import Swiper from "swiper";
// import "swiper/swiper-bundle.min.css";
// import './testimonialcarousel.css'

// const TestimonialCarousel = () => {
//   const testimonialData = [
//     {
//       avatar: "https://img.freepik.com/free-photo/woman-with-long-hair-yellow-hoodie-with-word-music-it_1340-39068.jpg",
//       name: "Simonette Lindermann",
//       review: "Mind-blowing discovery! changed my routine. Essential for everyone. A vise advice to all interested. Can't imagine without it!"
//     },
//     {
//       avatar: "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
//       name: "Merilee Beal",
//       review: "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer"
//     },
//     {
//       avatar: "https://img.freepik.com/free-photo/handsome-african-guy-with-stylish-haircut-taking-photo-digital-camera_171337-1345.jpg",
//       name: "Suzi Lankester",
//       review: "Phenomenal addition! Completely transformed my days. Can't go without it. Strongly endorse for all. A game-changer for sure!"
//     },
//     {
//       avatar: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
//       name: "Gaston Cunnow",
//       review: "Amazing product! It changed my life. Can't live without it now. Highly recommended to everyone!"
//     },
//     {
//       avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
//       name: "Marys Lobb",
//       review: "Life-altering find! Indispensable now. Enthusiastically suggest to all. A game-changer for everyone!"
//     },
//     {
//       avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
//       name: "Marys Lobb",
//       review: "Life-altering find! Indispensable now. Enthusiastically suggest to all. A game-changer for everyone!"
//     },
//     {
//       avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
//       name: "Marys Lobb",
//       review: "Life-altering find! Indispensable now. Enthusiastically suggest to all. A game-changer for everyone!"
//     }
//   ];

//   useEffect(() => {
//     const swiper = new Swiper("#craouselContainer", {
//       grabCursor: true,
//       centeredSlides: true,
//       slidesPerView: 2.3,
//       loop: true,
//       spaceBetween: 30,
//       effect: "coverflow",
//       coverflowEffect: {
//         rotate: 0,
//         depth: 800,
//         slideShadows: true
//       },
//       pagination: {
//         el: ".swiper-pagination",
//         clickable: true
//       },
//       autoplay: { delay: 500 }
//     });

//     const queryResizer = () => {
//       if (window.innerWidth < 724) swiper.params.slidesPerView = 2;
//       if (window.innerWidth > 501) swiper.params.slidesPerView = 2;
//       if (window.innerWidth > 724) swiper.params.slidesPerView = 2.3;
//       if (window.innerWidth < 501) swiper.params.slidesPerView = 1;
//       swiper.update();
//     };

//     window.addEventListener("resize", queryResizer);
//     queryResizer();

//     return () => window.removeEventListener("resize", queryResizer);
//   }, []);

//   return (
//   <div className="swiper-wrapper">
//       <div id="craouselContainer" className="swiper-container">
//       <div className="swiper-wrapper" id="slideHolder">
//         {testimonialData.map((testimonial, index) => (
//           <div key={index} className="swiper-slide">
//             <div className="ImgHolder">
//               <img src={testimonial.avatar} alt={testimonial.name} />
//             </div>
//             <div className="ContentHolder">
//               <h3>{testimonial.name}</h3>
//               <p>{testimonial.review}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="swiper-pagination"></div>
//     </div>
//   </div>
//   );
// };

// export default TestimonialCarousel;
