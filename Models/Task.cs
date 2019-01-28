using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Status { get; set; }  
        public bool Edited { get; set; }
    }
}
