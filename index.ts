#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = [];
let conditions = true;
console.log(
  chalk.bold.bgCyanBright( "\n \t\t ============== Welcome to the Todo App =================\n"));

async function createTodo(todos: string[]) {
  while (conditions) {
    let ans = await inquirer.prompt([
      {
        name: "todo",
        type: "list",
        message: "What do you want to do?",
        choices: ["Add", "Update", "Delete", "Show", "Exit"],
      },
    ]);

    if (ans.todo === "Add") {
      let addTask = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: "Add items in the list",
          validate: (value) => {
            if (value.trim() === "") {
              return chalk.bold.red("Please enter a task");
            } else {
              return true;
            }
          },
        },
      ]);
      todos.push(addTask.todo);
      console.log(chalk.bold.bgGreenBright(`Todo added`));
      todos.forEach((val) => console.log(chalk.bold.yellowBright(val)));
    }
    if (ans.todo === "Update") {
      let updateTask = await inquirer.prompt([
        {
          name: "todo",
          type: "list",
          message: "Update items in the list",
          choices: todos.map((todo) => todo),
        },
      ]);
      let addTask = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: "Add updated items in the list",
        },
      ]);
      let newList = todos.filter((todo) => todo !== updateTask.todo);
      todos = [...newList, addTask.todo];
      console.log(chalk.bold.bgCyan("Todo updated"));
      todos.forEach((val) => console.log(chalk.bold.magentaBright(val)));
    }
    if (ans.todo === "Delete") {
      let deleteTask = await inquirer.prompt([
        {
          name: "todo",
          type: "list",
          message: "Delete items in the list",
          choices: todos.map((todo) => todo),
        },
      ]);
      let newList = todos.filter((val) => val !== deleteTask.todo);
      todos = [...newList];
      console.log(chalk.bold.greenBright("Todo deleted"));
      todos.forEach((val) => console.log(chalk.bold.yellowBright(val)));
    }
    if (ans.todo === "Show") {
      console.log(
        chalk.bold.bgGreenBright(
          "\n \t================== Todo List ==================\n"
        )
      );
      todos.forEach((val) => console.log(chalk.bold.magentaBright(val)));
      if (todos.length === 0) {
        console.log(
          chalk.bold.bgBlueBright(
            "\n \t ======== No items in the list =========\n"
          )
        );
      } else
        console.log(chalk.bold.yellowBright("Showing all items in the list"));
      console.log(
        chalk.bold.bgGreenBright(
          "\n \t================== Todo List ===================\n"
        )
      );
    }
    if (ans.todo === "Exit") {
      console.log(chalk.bold.blue("\n \t Exiting the program..."));
      conditions = false;
      console.log(
        chalk.bold.bgGreenBright("\n \t Thank you for using the Todo App")
      );
    }
  }
}
createTodo(todos);
