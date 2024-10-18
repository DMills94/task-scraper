import { Command } from 'commander';
import { getCommandInstance } from '../..';
import { ArgumentValidator } from '../../../core/argument-validator';
import { RootCommand } from '../../root-command';
import { EnumCommand } from './enum-command';
import { EnumCommandModule } from './enum-command.module';

export function addEnumCommand(commandName: string, program: RootCommand): void {
  const get = new Command('get')
    .argument('<id>', 'enum id', ArgumentValidator.isNumber)
    .action(async (id: number, _options: any) => {
      const command: EnumCommand = await getCommandInstance(EnumCommand, EnumCommandModule);
      await command.handleGet(id);
    });

  const getMany = new Command('get-many')
    .argument('<id-array>', 'array of ids', ArgumentValidator.isNumberArray)
    .action(async (ids: number[], _options: any) => {
      const command: EnumCommand = await getCommandInstance(EnumCommand, EnumCommandModule);
      for (const id of ids) {
        await command.handleGet(id);
      }
    });

  const findString = new Command('find-string')
    .argument('<search-string>', 'string to search for in all string enums')
    .action(async (searchString: string, _options: any) => {
      const command: EnumCommand = await getCommandInstance(EnumCommand, EnumCommandModule);
      await command.handleFindString(searchString);
    });

  const findStruct = new Command('find-struct')
    .argument('<search-int>', 'number to search for in all struct enums', ArgumentValidator.isNumber)
    .action(async (searchInt: number, _options: any) => {
      const command: EnumCommand = await getCommandInstance(EnumCommand, EnumCommandModule);
      await command.handleFindStruct(searchInt);
    });

  program
    .command(commandName)
    .description('data operations related to enums')
    .addCommand(get)
    .addCommand(getMany)
    .addCommand(findString)
    .addCommand(findStruct);
}

