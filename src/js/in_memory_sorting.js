export default class Table {
  constructor(data, container) {
    this.data = data;
    this.container = container;
    this.columnNames = ["id", "title", "year", "imdb"];
  }

  sort(sortParam, ascending) {
    if (sortParam !== "title") {
      ascending
        ? this.data.sort(
          (current, next) => +current[sortParam] - +next[sortParam],
          )
        : this.data.sort(
            (current, next) => +next[sortParam] - +current[sortParam],
          );
    } else {
      ascending
        ? this.data.sort((current, next) =>
            current[sortParam].localeCompare(next[sortParam]),
          )
        : this.data.sort((current, next) =>
            next[sortParam].localeCompare(current[sortParam]),
          );
    }
  }

  deleteLastTable() {
    const lastTable = this.container.querySelector(".films-table");
    if (lastTable !== null) {
      this.container.removeChild(lastTable);
    }
  }

  loadTable(sortParam, ascending) {
    this.deleteLastTable();
    this.sort(sortParam, ascending);
    const tableElement = document.createElement("table");
    tableElement.setAttribute("class", "films-table");
    const titleTableRow = document.createElement("tr");
    this.columnNames.forEach((name) => {
      const titleCell = document.createElement("td");
      titleCell.setAttribute("class", "cell");
      name !== sortParam
        ? (titleCell.textContent = name)
        : ascending
          ? (titleCell.textContent = `${name}↑`)
          : (titleCell.textContent = `${name}↓`);
      titleTableRow.appendChild(titleCell);
    });
    tableElement.appendChild(titleTableRow);
    this.data.forEach((element) => {
      const tableRow = document.createElement("tr");
      Object.values(element).forEach((value, index, array) => {
        const cell = document.createElement("td");
        [0, 1].includes(index)
          ? (cell.textContent = value)
          : index === 2
            ? (cell.textContent = `(${array[index + 1]})`)
            : (cell.textContent = array[index - 1].toFixed(2));
        cell.setAttribute("class", "cell");
        tableRow.appendChild(cell);
      });
      tableElement.appendChild(tableRow);
    });

    this.container.appendChild(tableElement);
  }

  changeSortingOrder() {
    let ascending = true;
    let index = 0;
    this.loadTable(
      this.columnNames[index % this.columnNames.length],
      ascending,
    );
    ascending = !ascending;
    setTimeout(() => {
      this.loadTable(
        this.columnNames[index % this.columnNames.length],
        ascending,
      );
      index += 1;
      ascending = !ascending;
    }, 2000);
    setInterval(() => {
      this.loadTable(
        this.columnNames[index % this.columnNames.length],
        ascending,
      );
      ascending = !ascending;
      setTimeout(() => {
        this.loadTable(
          this.columnNames[index % this.columnNames.length],
          ascending,
        );
        index += 1;
        ascending = !ascending;
      }, 2000);
    }, 4000);
  }
}
