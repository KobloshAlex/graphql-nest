import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput) {
    const { lastName, firstName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      lastName,
      firstName,
    });

    return this.studentRepository.save(student);
  }

  async getAllStudents(limit?: number): Promise<Student[]> {
    return this.studentRepository.find({ take: limit });
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
