const data = [
  {
    id: 0,
    url: "https://www.youtube.com/watch?v=TaJgaZOUaac",
    title: "Lover / Earth Angel",
    singer: "Joey Stamper Mashup ",
    thumbnail: "https://i.ytimg.com/vi/TaJgaZOUaac/hqdefault.jpg",
  },
  {
    id: 1,
    url: "https://www.youtube.com/watch?v=KUXG1mQkdmU",
    title: "Perfect",
    singer: "Jada Facer & Ricardo Hurtado",
    thumbnail: "https://i.ytimg.com/vi/KUXG1mQkdmU/hqdefault.jpg",
  },
  {
    id: 2,
    url: "https://www.youtube.com/watch?v=Bwq3f5_kMfY",
    title: "Pass You By",
    singer: "Alaina Castillo",
    thumbnail: "https://i.ytimg.com/vi/Bwq3f5_kMfY/hqdefault.jpg",
  },
  {
    id: 3,
    url: "https://www.youtube.com/watch?v=ezcdE4lPpq8",
    title: "You Are The Reason",
    singer: "Alexandra Porat",
    thumbnail: "https://i.ytimg.com/vi/ezcdE4lPpq8/hqdefault.jpg",
  },
  {
    id: 4,
    url: "https://www.youtube.com/watch?v=Ww1SOu2btR0",
    title: "blue",
    singer: "inviz",
    thumbnail: "https://i.ytimg.com/vi/Ww1SOu2btR0/hqdefault.jpg",
  },
  {
    id: 5,
    url: "https://www.youtube.com/watch?v=iVxcjbrj5Fc",
    title: "사랑 앞에서",
    singer: "유용민",
    thumbnail: "https://i.ytimg.com/vi/iVxcjbrj5Fc/hqdefault.jpg",
  },
  {
    id: 6,
    url: "https://www.youtube.com/watch?v=4gda8UjPqp0",
    title: "사랑해줘요(Love me)",
    singer: "마인드유(MIND U)",
    thumbnail: "https://i.ytimg.com/vi/4gda8UjPqp0/hqdefault.jpg",
  },
  {
    id: 7,
    url: "https://www.youtube.com/watch?v=rp3w7rZBxBo",
    title: "Mean It",
    singer: "Lauv, LANY",
    thumbnail: "https://i.ytimg.com/vi/rp3w7rZBxBo/hqdefault.jpg",
  },
];
const render = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const getData = async () => {
  await render(500);
  return data;
};

export const getThumb = async () => {
  await render();
  return data;
};
