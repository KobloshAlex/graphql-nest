import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentType])
  students(
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<Student[]> {
    return this.studentService.getAllStudents(limit);
  }

  @Query(() => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }
}
