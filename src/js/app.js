import Table from "./in_memory_sorting";
import data from "../assets/data.json";
console.log(data);

const container = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", () => {
  const table = new Table(data, container);
  table.changeSortingOrder();
});
