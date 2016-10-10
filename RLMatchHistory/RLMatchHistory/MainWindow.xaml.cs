using System;
using System.IO;
using System.Windows;
using RocketLeagueReplayParser;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace RLMatchHistory
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            String path = "C:\\Users\\" + Environment.UserName + "\\Documents\\My Games\\Rocket League\\TAGame\\Demos\\";
            DirectoryInfo d = new DirectoryInfo(path);
            Console.WriteLine(path);
            watch(path);
            foreach (FileInfo file in d.GetFiles("*.replay"))
            {
                Replay replay = Replay.Deserialize(file.FullName);
                RocketLeagueReplayParser.Serializers.JsonSerializer jserializer = new RocketLeagueReplayParser.Serializers.JsonSerializer();
                string jsonString = jserializer.Serialize(replay);
                int i = jsonString.IndexOf("\"Frames\"");
                jsonString = jsonString.Substring(0, i - 1);
                jsonString = jsonString + "}";
                JObject json = JObject.Parse(jsonString);
            }
        }

        private void watch(String path)
        {
            FileSystemWatcher watcher = new FileSystemWatcher();
            watcher.Path = path;
            watcher.NotifyFilter = NotifyFilters.LastWrite;
            watcher.Filter = "*.replay";
            watcher.Changed += new FileSystemEventHandler(OnChanged);
            watcher.EnableRaisingEvents = true;
        }

        private void OnChanged(object source, FileSystemEventArgs e)
        {
            //JObject json = parseReplay(source.???);
        }

        private JObject parseReplay(string path)
        {
            Replay replay = Replay.Deserialize(path);
            RocketLeagueReplayParser.Serializers.JsonSerializer jserializer = new RocketLeagueReplayParser.Serializers.JsonSerializer();
            string jsonString = jserializer.Serialize(replay);
            int i = jsonString.IndexOf("\"Frames\"");
            jsonString = jsonString.Substring(0, i - 1);
            jsonString = jsonString + "}";
            JObject json = JObject.Parse(jsonString);
            return json;
        }

    }
}
