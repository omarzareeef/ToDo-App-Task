using Microsoft.EntityFrameworkCore;
using Todo_Api.Models;

namespace Todo_Api.Data;


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}
