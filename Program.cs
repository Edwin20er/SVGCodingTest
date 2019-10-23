using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    public class Mode
    {
        private string name = string.Empty;
        private int sales_one = 0;
        private int sales_two = 0;
        private int value = 1;

        public string Name { get => name; set => name = value; }
        public int Sales_one { get => sales_one; set => sales_one = value; }
        public int Sales_two { get => sales_two; set => sales_two = value; }
        public int Value { get => value; set => this.value = value; }
        

        public Mode(string name, int sales_one, int sales_two, int value)
        {
            this.Name = name;
            this.sales_one = sales_one;
            this.sales_two = sales_two;
            this.value = value;
        }

        public Mode(string name, int sales_one, int sales_two)
        {
            this.Name = name;
            this.sales_one = sales_one;
            this.sales_two = sales_two;
            this.value = 1;
        }

        public String WriteToJSON()
        {
            String result = "{";
            result += "\"Name\":\"" + this.name + "\",";
            result += "\"First Year\":" + this.sales_one+ ",";
            result += "\"Second Year\":" + this.sales_two + ",";
            result += "\"Value\":" + this.value;
            result += "}";
            return result;
        }

        public String Print()
        {
            String result = "";
            result += Name + "|" +  sales_one.ToString() + "|" + sales_two.ToString() + "|" + value.ToString();

            return result;
        }

    }


    class Program
    {
        private const string Path = @".\Data.csv";
        private const int debug = 2;


        static void Main(string[] args)
        {
            
            int counter = 0;
            List<Mode> collection = new List<Mode>();
            try
            {
                StreamReader file_input = new StreamReader(Path);
                string input;
                string full_pattern = @"(.*);(\d*);(\d*);(\d*)";
                Regex full_matcher = new Regex(full_pattern);
                string inc_pattern = @"(.*);(\d*);(\d*)";
                Regex inc_matcher = new Regex(inc_pattern);
                
                
                while (file_input.Peek() >= 0)
                {
                    input = file_input.ReadLine();
                    if (debug == 1)
                    {
                        Console.WriteLine(input);
                    }
                    if (full_matcher.IsMatch(input))
                    {
                        Console.WriteLine(input + " is a complete match.");
                        Match full_match = full_matcher.Match(input);
                        Group[] dataset = new Group[4];
                        for (int i = 1; i <= 4; i++)
                        {
                            dataset[i - 1] = full_match.Groups[i];
                        }
                        collection.Add(new Mode(dataset[0].ToString().Trim(), Int32.Parse(dataset[1].ToString()), Int32.Parse(dataset[2].ToString()), Int32.Parse(dataset[3].ToString())));
                        counter++;

                    }
                    else if (inc_matcher.IsMatch(input))
                    {
                        Console.WriteLine(input + " is an incomplete match.");
                        Console.WriteLine(input + " is a complete match.");
                        Match full_match = inc_matcher.Match(input);
                        Group[] dataset = new Group[3];
                        for (int i = 1; i <= 3; i++)
                        {
                            dataset[i - 1] = full_match.Groups[i];
                        }
                        collection.Add(new Mode(dataset[0].ToString().Trim(), Int32.Parse(dataset[1].ToString()), Int32.Parse(dataset[2].ToString())));
                        counter++;
                    }
                    else
                    {
                        Console.WriteLine(input + " is not a match.");
                    }
                }
                foreach (Mode transport in collection)
                {
                    try
                    {
                        Console.WriteLine(transport.Print());
                    }
                    catch (Exception e)
                    {

                        break;
                    }
                }
                file_input.Close();
                Console.WriteLine(counter.ToString());



            }
            catch (Exception e)
            {


            }
            new Program.WriteToHTML();
            string output = "";
            output += "function Mode(name, year_one, year_two, value){\nthis.name = name;\nthis.year_one = year_one;\nthis.year_two = year_two;\nthis.value=value;}\n\n";

            output += "function data_load() {\n var collection = [];\n"; 
            for (int i = 0; i < counter; i++)
            {
                output += "\tcollection.push(new Mode(\"" + collection[i].Name + "\"," + collection[i].Sales_one.ToString() + "," + collection[i].Sales_two.ToString() + 
                        "," + collection[i].Value.ToString() + "));\n";
            }
            output += "return collection;\n";
            output += "}\n";

            output += "function dataMax() {\n return " + GetMax(collection).ToString() + ";\n}";

            File.WriteAllText(@".\data.js", output);
            Console.ReadKey();
        }

        
        public static int GetMax(List<Mode> collection)
        {
            int max = 0;
            foreach (Mode entry in collection)
            {
                if (entry.Sales_one * entry.Value > max)
                {
                    max = entry.Sales_one * entry.Value;
                }
                if (entry.Sales_two * entry.Value > max)
                {
                    max = entry.Sales_two * entry.Value;
                }

            }
            return max;
        }

        private class WriteToHTML
        {
            public WriteToHTML()
            {
                String HTML = "<!DOCTYPE html><html><script type = \"text/javascript\" src=\"playground.js\"> </script>" +
                    "<script type = \"text/javascript\" src=\"data.js\">" +
                    "</script><body onload=\"test()\" onresize=\"test()\"><svg id=\"plaything\"></svg>" +
                    "<svg id=\"market-share\"></svg>" +
                    "</body></html> ";
                File.WriteAllText(@".\playground.html", HTML);

            }
        }


    }




}
