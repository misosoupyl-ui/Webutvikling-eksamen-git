// Objektet vi gjør CRUD via mot databasen.
// Bestemmer hvilke klasser som skal lages tabeller av.

using Microsoft.EntityFrameworkCore; 
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Contexts;

public class SportsWorldContext : DbContext
{
    public SportsWorldContext(DbContextOptions<SportsWorldContext> options)
    : base(options)
    {
        
    }
    

       // Tabeller i DB.
     public DbSet<Finance> Finances {get; set;}
     public DbSet<Athlete> Athletes {get; set;}
}



 
