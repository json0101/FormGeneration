// See https://aka.ms/new-console-template for more information


// string? command = Console.ReadLine();

// if (command == null)
// {
//     return;
// }

// if (command.Contains("generar"))
{
    Console.WriteLine("Generando");
    var dir = new DirectoryInfo("C:/Users/jason.hernandez/Documents/Development/GeneratedFormsCode/GenerationForms/sheets_code/report_sheet");
    var files = GetFiles(dir);
    var variablesInFiles = GetVariables(files);
    var variablesUnique = variablesInFiles.Distinct().Order();

    // Dictionary<string, string> variables = new Dictionary<string, string>()
    // {
    //     { "$[name_entity_class]", "Application" },
    //     { "$[name_entity]", "app" },
    //     { "$[name_folder]", "app" },
    //     { "$[name_id]", "appId" },
    //     { "$[title_page_edit]", "Edit Application" },
    //     { "$[title_page_new]", "New Application" },
    //     { "$[title_list_name]", "Listado de Aplicaciones" },
    //     { "$[url_backend]", "Application" },
    //     { "$[cshart_namespace]", "Applications" },
    //     { "$[name_ef_query]", "appli" }
    // };

    Dictionary<string, string> variables = new Dictionary<string, string>();
    Console.WriteLine("Ingrese el valor de estas variables");

    foreach (var item in variablesUnique)
    {
        Console.WriteLine($"{item}");
        string? value = Console.ReadLine();

        if (value == null) continue;

        variables.Add(item, value);
    }

    var directoryTo = new DirectoryInfo("C:/Users/jason.hernandez/Documents/Development/GeneratedFormsCode/GenerationForms/DestinationFiles/report/report_groups");

    ProccessFiles(variables, dir, directoryTo);
}

Console.WriteLine("Finalizado");

void ProccessFiles(Dictionary<string, string> variables, DirectoryInfo directoryFrom, DirectoryInfo directoryTo)
{
    DeleteFilesInDirectory(directoryTo);

    var directories = directoryFrom.GetDirectories();

    string nameNewDirectory = directoryFrom.Name;
    foreach (var variable in variables)
    {
        nameNewDirectory = nameNewDirectory.Replace(variable.Key, variable.Value);
    }

    DirectoryInfo newDirectory = Directory.CreateDirectory($"{directoryTo.FullName}/{nameNewDirectory}");

    foreach (var directory in directories)
    {
        ProccessFiles(variables, directory, newDirectory);
    }
         
    SaveFiles(variables, directoryFrom, newDirectory);
}

void SaveFiles (Dictionary<string, string> variables, DirectoryInfo from, DirectoryInfo to)
{
    foreach (var file in from.GetFiles())
    {
        try
        {
            using StreamReader reader = new(file.FullName);
            string text = reader.ReadToEnd();
            string newText = text;

            string name = file.Name;
            string newName = name;

            foreach (var variable in variables)
            {
                newText = newText.Replace(variable.Key, variable.Value);
            }

            foreach (var variable in variables)
            {
                newName = newName.Replace(variable.Key, variable.Value);
            }

            using (StreamWriter writer = new StreamWriter($"{to.FullName}/{newName}"))
            {
                writer.Write(newText);
            }
        }
        catch (IOException e)
        {
            Console.WriteLine("The file could not be read:");
            Console.WriteLine(e.Message);
        }
    }
}

FileInfo[] GetFiles(DirectoryInfo? directoryInfo)
{
    if (directoryInfo == null)
        return [];

    var directories = directoryInfo.GetDirectories();
    List<FileInfo> subDirectories = new List<FileInfo>();

    foreach (var directory in directories)
    {
        var files = GetFiles(directory);
        subDirectories.AddRange(files);
    }

    var filesDirectory = directoryInfo.GetFiles();
    subDirectories.AddRange(filesDirectory);
    return subDirectories.ToArray();
}

string[] GetVariables(FileInfo[] files)
{
    List<string> variables = new List<string>();

    foreach (var file in files)
    {
        string fileName = file.Name;
        var variablesInFileName = ExtractVariables(fileName);

        variables.AddRange(variablesInFileName);

        try
        {
            using StreamReader reader = new(file.FullName);
            string text = reader.ReadToEnd();
            var variablesInTextFile = ExtractVariables(text);
            variables.AddRange(variablesInTextFile);
        }
        catch (IOException e)
        {
            Console.WriteLine("The file could not be read:");
            Console.WriteLine(e.Message);
        }
    }

    return variables.ToArray();
}

string[] ExtractVariables(string text)
{
    bool enabledConcat = false;
    string name_variable = "";
    List<string> names_variables = new List<string>();

    for (int i = 0; i < text.Length; i++)
    {
        char character = text[i];
        if (character == '$' && text[i + 1] == '[')
        {
            enabledConcat = true;
        }

        if (enabledConcat == true)
        {
            name_variable += character.ToString();
        }

        if (character == ']' && enabledConcat == true)
        {
            names_variables.Add(name_variable);
            enabledConcat = false;
            name_variable = "";
        }
    }

    return names_variables.ToArray();
}


void DeleteFilesInDirectory(DirectoryInfo directoryInfo)
{
    FileInfo[] files = directoryInfo.GetFiles();

    foreach (var f in files)
    {
        f.Delete();
    }

}

