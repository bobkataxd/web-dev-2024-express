import { DataTypes, Sequelize } from 'sequelize';
import { User, UserModel } from './user/user';
import { UniversityModel } from './university/university';
import { Subject, SubjectModel } from './subject/subject';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // SQLite database file path
});

export const db = {
    sequelize,
    Sequelize,
    models: {
        User: UserModel(sequelize),
        University: UniversityModel(sequelize),
        Subject: SubjectModel(sequelize)
        
    },
};

db.models.User.belongsTo(db.models.University, {
    foreignKey: 'universityId',
    as: 'university',
});

db.models.University.hasMany(db.models.User, {
    foreignKey: 'universityId',
    as: 'users',
});


const UserSubjects = sequelize.define('UserSubjects',{
    SubjectId: {
        type: DataTypes.INTEGER,
        references: {
          model: Subject, // 'Subjects' would also work
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User, // 'Users' would also work
          key: 'id',
        },
      },
});

db.models.Subject.belongsToMany( db.models.User, {
    through: UserSubjects
});
