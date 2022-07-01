using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EmployeesAPI.Models
{
    public partial class EMPLOYEE_DATABASEContext : DbContext
    {
        public EMPLOYEE_DATABASEContext()
        {
        }

        public EMPLOYEE_DATABASEContext(DbContextOptions<EMPLOYEE_DATABASEContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BusinessUser> BusinessUsers { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("DB_CONNECTION"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessUser>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK__BUSINESS__F3DBC573583A5718");

                entity.ToTable("BUSINESS_USER");

                entity.Property(e => e.Username)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Passwrd)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("passwrd");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.DName)
                    .HasName("PK__DEPARTME__112B23CEBEC94EE3");

                entity.ToTable("DEPARTMENT");

                entity.Property(e => e.DName)
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("dName");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("EMPLOYEE");

                entity.HasIndex(e => e.NationalNumber, "UQ__EMPLOYEE__C9C4D897E532BEDB")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Adress)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("adress");

                entity.Property(e => e.BDate)
                    .HasColumnType("date")
                    .HasColumnName("bDate");

                entity.Property(e => e.DName)
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("dName");

                entity.Property(e => e.Fname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(97)
                    .IsUnicode(false)
                    .HasColumnName("lname");

                entity.Property(e => e.Mname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("mname");

                entity.Property(e => e.NationalNumber).HasColumnName("nationalNumber");

                entity.Property(e => e.Salary).HasColumnName("salary");

                entity.Property(e => e.Sex)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("sex")
                    .IsFixedLength();

                entity.HasOne(d => d.DNameNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.DName)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__EMPLOYEE__dName__286302EC");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
