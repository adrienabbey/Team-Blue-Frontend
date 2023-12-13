import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  courses: Course[] = [];
  showAddCourseModal = false;
  showDeleteModal = false;
  showEditModal = false;
  courseAdd: Course = new Course();
  courseEdit: Course = new Course();
  id: number;

  constructor(private courseService: CourseService) { }

  /**
   * ngOnInit is a lifecycle hook. It is called after the constructor. And is only called once. This hook is good for fetching initial data
   */
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses)
    setTimeout(() => { this.ngOnInit() }, 1000 * 1);
  }

  /**
   *  This function should be called to open the Add Courses p-dialog modal.
   */
  openAddCourse() {
    this.showAddCourseModal = true;
  }

  /**
   *  This function should be called to open the Edit Course p-dialog modal.
   *  Should also be used to set the Edit object to the course we will be editing
   */
  openEdit(course: Course) {
    this.courseEdit = { ...course };
    this.showEditModal = true;
  }

  /**
   *  This function should be called to open the Delete Course p-dialog modal.
   *  Will need to keep track of the id of the course to send to the service
   */
  openDelete(id: number) {
    this.id = id;
    this.showDeleteModal = true;
  }

  /**
   *  This function should be invoked to call the delete service.
   *  Will also need to close the modal
   */
  deleteCourse() {
    this.courseService.deleteCourse(this.id);
    this.showDeleteModal = false;
  }

  /**
   *  This function should be invoked when the user cancels deleting a course.
   */
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  /**
   *  This function should be invoked when the user cancels editing a course.
   */
  closeEditModal() {
    this.showEditModal = false;
  }

  /**
   *  This function should be invoked when the user cancels adding a course.
   */
  closeAddModal() {
    this.showAddCourseModal = false;
  }

  /**
   *  This function should be invoked when the user confirms adding a course.
   *  Should call the add course service with the proper parameter
   *  Need to close the modal afterward
   */
  confirmAdd() {
    this.courseService.addCourse(this.courseAdd).subscribe(response => this.courses.push(response));
    this.showAddCourseModal = false;
  }

  /**
   *  This function should be invoked when the user confirms editing a course.
   *  Should call the update course service with the proper parameter
   *  Need to close the modal afterward
   */
  confirmEdit() {
    this.courseService.updateCourse(this.courseEdit).subscribe(response => {
      const index = this.courses.findIndex(course => course.id === response.id);
      this.courses[index] = response;
    });
    this.showEditModal = false;
  }
}
