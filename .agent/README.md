# 📁 .agent Directory

This directory contains AI-generated documentation, analysis, and guidelines for the Manajemen Pesantren project.

---

## 📚 Documentation Index

### 🗄️ Database Documentation

#### **DATABASE_RULES.md** ⭐ START HERE
Comprehensive database design rules and best practices.
- 7 mandatory rules to prevent redundancy
- Best practices for schema design
- Naming conventions
- Review checklist before migrations

#### **DATABASE_QUICK_REF.md** ⚡ QUICK REFERENCE
Quick reference card for daily use.
- Common commands
- Quick checklist
- When to use which table
- Red flags to watch for

#### **CLEANUP_SUMMARY.md** 📊 STATUS REPORT
Summary of database cleanup work (2026-01-14).
- What was cleaned up
- Current database state
- Metrics and improvements
- Next steps

#### **database-efficiency-analysis.md** 🔍 DETAILED ANALYSIS
Full analysis of database efficiency issues.
- Identified unused tables
- Duplicate systems
- Detailed recommendations
- 3 solution options (A, B, C)

#### **database-diagram.md** 📈 VISUAL DIAGRAM
Mermaid diagram showing table relationships.
- Active vs unused tables
- System dependencies
- Visual overview

---

### 🔧 Migration & Consolidation

#### **consolidation-plan.md** 📋 ACTION PLAN
Step-by-step plan to consolidate small tables.
- Merge contact_info → website_settings
- Merge social_media → website_settings
- Code changes required
- Testing checklist

#### **migration-plan-opsi-b.md** 🚀 FUTURE MIGRATION
Comprehensive plan for migrating to unified CMS (optional).
- 6 phases over 4 weeks
- Migration scripts
- Risk mitigation
- Only if needed in future

---

### 🗑️ Cleanup Scripts

#### **cleanup-database-opsi-a.sql** ✅ EXECUTED
SQL script for cleaning up unused tables.
- Status: ✅ Already applied
- Removed 5 unused tables
- Saved ~800 kB

---

## 🎯 Quick Start

### For Developers

1. **Read first:** `DATABASE_RULES.md`
2. **Keep handy:** `DATABASE_QUICK_REF.md`
3. **Before migrations:** Check rules and run verification

### For Database Changes

1. Check `DATABASE_RULES.md` for guidelines
2. Verify no duplicate functionality exists
3. Update code before applying migration
4. Follow checklist in `DATABASE_QUICK_REF.md`

### For Understanding Current State

1. Read `CLEANUP_SUMMARY.md` for overview
2. Check `database-efficiency-analysis.md` for details
3. View `database-diagram.md` for visual representation

---

## 📊 Current Database Status

**Last Updated:** 2026-01-14

- **Total Tables:** 17 (down from 22)
- **Total Size:** 1.1 MB
- **Unused Tables:** 0 (cleaned up)
- **Documentation:** Complete ✅

---

## 🚀 Next Steps (Optional)

1. **Consolidate Settings** (Priority 2)
   - Follow `consolidation-plan.md`
   - Merge small tables into `website_settings`

2. **Unify Navigation** (Priority 3)
   - Choose between `navigation_items` vs `website_menus`
   - Drop the unused one

3. **Implement or Remove** (Priority 4)
   - `media_library` - implement upload or drop
   - `audit_log` - implement logging or drop

---

## 📝 File Naming Convention

- **UPPERCASE.md** - Important guidelines/rules (read first)
- **lowercase-with-dashes.md** - Analysis and plans
- **lowercase.sql** - SQL scripts

---

## 🔄 Maintenance

This directory should be updated when:
- Database schema changes significantly
- New rules or guidelines are established
- Major cleanup or optimization is performed
- Migration plans are created or executed

---

## 🆘 Questions?

If you're unsure about database changes:
1. Check the rules in `DATABASE_RULES.md`
2. Review similar cases in documentation
3. Ask team before proceeding
4. When in doubt, consolidate rather than fragment

---

**Remember: This documentation exists to prevent future problems. Use it!** 🎯
