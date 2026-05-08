import { program } from "commander";



program
  .name("Omnify")
  .description("Give native powers to your Web Application , Build with Omnify Shell")
  .version("1.0.0")
  .addHelpText('after', `
Examples:
  npx omnify init
  npx omnify add camera
  npx omnify build --windows
  npx omnify login
  npx omnify publish
  `)
export default program;

program
  .command("init")
  .action(()=> console.log("hello init"));


program
    .command("add")
    .action(()=> console.log("added successfully"))




program.parse();