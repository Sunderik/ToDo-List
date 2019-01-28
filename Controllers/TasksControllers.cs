using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [Route("api/tasks")]
    public class TaskControllers : Controller
    {
        ApplicationContext db;
        public TaskControllers(ApplicationContext context)
        {
            db = context;
            if (!db.Tasks.Any())
            {
                db.Tasks.Add(new Task { Text = "Задача 1", Status = false, Edited = false });
                db.Tasks.Add(new Task { Text = "Задача 2", Status = false, Edited = false });
                db.Tasks.Add(new Task { Text = "Задача 3", Status = false, Edited = false });
                db.SaveChanges();
            }
        }
            [HttpGet]
        public IEnumerable<Task> Get()
        {
            return db.Tasks.ToList();
        }
        [HttpGet("{id}")]
        public Task Get(int id)
        {
            Task task = db.Tasks.FirstOrDefault(x => x.Id == id);
            return task;
        }
        [HttpPost]
        public IActionResult Post([FromBody]Task task)
        {
            if (ModelState.IsValid)
            {
                db.Tasks.Add(task);
                db.SaveChanges();
                return Ok(task);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Task task)
        {
            if (ModelState.IsValid)
            {
                db.Update(task);
                db.SaveChanges();
                return Ok(task);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Task task = db.Tasks.FirstOrDefault(x => x.Id == id);
            if (task != null)
            {
                db.Tasks.Remove(task);
                db.SaveChanges();
            }
            return Ok(task);
        }
        [HttpDelete("completed")]
        public IActionResult Delete()
        {
            Task[] tasks = db.Tasks.Where(x => x.Status == true).ToArray();
            foreach(Task task in tasks)
            if (task != null)
            {
                db.Tasks.Remove(task);
                db.SaveChanges();
            }
            return Ok();
        }
    }
}
