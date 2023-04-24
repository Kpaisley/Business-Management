using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace BusinessManagement.Data;

public partial class BusinessManagementContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string conn;

    public BusinessManagementContext(DbContextOptions<BusinessManagementContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
        conn = _configuration.GetConnectionString("BusinessDB");
    }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(conn);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BCD12DCF5AD");

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.CompanyId)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("CompanyID");
            entity.Property(e => e.DepartmentName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF1B81B532D");

            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.FirstName)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Position)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Salary)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.Employees)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employees__Depar__276EDEB3");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__B40CC6ED7C4044A1");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CompanyId)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("CompanyID");
            entity.Property(e => e.ProductName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
