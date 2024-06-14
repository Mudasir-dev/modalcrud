using Microsoft.EntityFrameworkCore;
using modalcrud.Models.DBEntities;

namespace modalcrud.DAL
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions options) : base(options)
        {

        }

            public virtual DbSet<PRoduct> Products { get; set; }
    
}
}
